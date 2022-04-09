<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular
        indeterminate
        size="64"
      ></v-progress-circular>
    </v-overlay>
  <v-row class="fill-height">
    <v-col>
      <v-sheet height="64">
        <v-toolbar flat>
          <v-btn color="primary" dark class="mr-4" @click="dialog = true"
            >Agregar</v-btn
          >
          <v-btn outlined class="mr-4" color="grey darken-2" @click="setToday">
            Hoy
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="prev">
            <v-icon small> mdi-chevron-left </v-icon>
          </v-btn>
          <v-btn fab text small color="grey darken-2" @click="next">
            <v-icon small> mdi-chevron-right </v-icon>
          </v-btn>
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </v-toolbar-title>
          <v-spacer></v-spacer>
          <v-menu bottom right>
            <template v-slot:activator="{ on, attrs }">
              <v-btn outlined color="grey darken-2" v-bind="attrs" v-on="on">
                <span>{{ typeToLabel[type] }}</span>
                <v-icon right> mdi-menu-down </v-icon>
              </v-btn>
            </template>
            <v-list>
              <v-list-item @click="type = 'day'">
                <v-list-item-title>Día</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'week'">
                <v-list-item-title>Semana</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = 'month'">
                <v-list-item-title>Mes</v-list-item-title>
              </v-list-item>
              <v-list-item @click="type = '4day'">
                <v-list-item-title>4 días</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-toolbar>
      </v-sheet>
      <v-sheet height="600">
        <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          :short-weekdays="false"
          locale="es"
        ></v-calendar>

        <v-dialog v-model="dialog" max-width="500">
          <v-card>
            <v-container>
              <v-form @submit.prevent="addEvent">
                <v-text-field
                  v-model="name"
                  type="text"
                  label="Nombre del Evento"
                ></v-text-field>
                <v-text-field
                  v-model="details"
                  type="text"
                  label="Detalles"
                ></v-text-field>
                <v-text-field
                  v-model="start"
                  type="date"
                  label="Fecha Inicio"
                ></v-text-field>
                <v-text-field
                  v-model="end"
                  type="date"
                  label="Fecha Fin"
                ></v-text-field>
                <v-text-field
                  v-model="color"
                  type="color"
                  label="color"
                ></v-text-field>
                <v-btn
                  type="submit"
                  color="primay"
                  class="mr-4"
                  @click.stop="dialog = false"
                  >Crear Evento</v-btn
                >
              </v-form>
            </v-container>
          </v-card>
        </v-dialog>

        <v-menu
          v-model="abrirSeleccionado"
          :close-on-content-click="false"
          :activator="elementoSeleccionado"
          offset-x
        >
          <v-card color="grey lighten-4" min-width="350px" flat>
            <v-toolbar :color="eventoSeleccionado.color" dark>
              <v-btn @click="deleteEvent(eventoSeleccionado.id)" icon>
                <v-icon>mdi-delete</v-icon>
              </v-btn>
              <v-toolbar-title v-html="eventoSeleccionado.name"></v-toolbar-title>
              <v-spacer></v-spacer>
              <v-btn icon>
                <v-icon @click="agregarFavorito(eventoSeleccionado, true)">mdi-heart</v-icon>
              </v-btn>
            </v-toolbar>
            <v-card-text>
            <form v-if="eventoEdit !== eventoSeleccionado.id" style="color:#A39F9E">
              {{eventoSeleccionado.details}}
                </form>
                <form v-else>
                    <textarea-autosize v-model="eventoSeleccionado.details" type="text" style="width:100%;" :min-height="100" placeholder="Agregar Nota" />
                </form>
            </v-card-text>
            <v-card-actions>
                <v-btn v-if="eventoEdit !== eventoSeleccionado.id" @click.prevent="editEvent(eventoSeleccionado)" text color="success">
                Edit
              </v-btn>
              <v-btn v-else @click.prevent="updateEvent(eventoSeleccionado)" text color="success" @click="abrirSeleccionado = false">
                Guardar
              </v-btn>
              <v-btn text color="secondary" @click="abrirSeleccionado = false">
                Cancelar
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-menu>
      </v-sheet>
    </v-col>
  </v-row>
  <v-row>
<v-col>
<v-card>
    <v-card-title>
        Eventos Favoritos
    </v-card-title>
    <v-container>
    <div style="margin: 10px;" v-for="evento in this.events" :key="evento.id">
        <v-chip @click="irFavorito(evento)" v-if="evento.favorito" close @click:close="agregarFavorito(evento,false)" label dark :color="evento.color">
            {{evento.name}}
        </v-chip>
    </div>
    </v-container>
    
</v-card>
</v-col>
  </v-row>
</div>
</template>

<script>
import { db } from "@/main";
import { mapGetters } from 'vuex';
export default {
  data: () => ({
    focus: new Date().toISOString().substr(0, 10),
    today: new Date().toISOString().substr(0, 10),
    type: "month",
    typeToLabel: {
      month: "Mes",
      week: "Semana",
      day: "Día",
      "4day": "4 Días",
    },
    start: null,
    end: null,
    name: null,
    details: null,
    color: "#1976D2",
    dialog: false,
    eventoSeleccionado: {},
    elementoSeleccionado: null,
    abrirSeleccionado: false,
    eventoEdit: false,
    events: [],
    colors: [
      "blue",
      "indigo",
      "deep-purple",
      "cyan",
      "green",
      "orange",
      "grey darken-1",
    ],
    names: [
      "Meeting",
      "Holiday",
      "PTO",
      "Travel",
      "Event",
      "Birthday",
      "Conference",
      "Party",
    ],
    overlay: true,
  }),
  created() {
    this.getEvents();
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },
  computed: {
    ...mapGetters(["getCurrentUserEmail"])
  },
  methods: {
    async getEvents() {
      try {
        const snapshot = await db.collection("calEvento").where("userEmail", "==", this.getCurrentUserEmail).get();
        const events = [];
        snapshot.forEach((doc) => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
        });
        this.events = events;

        console.log(this.events)
        this.overlay = false;
      } catch (error) {
        alert('an error ocurred')
        this.overlay = false;
        console.log(error);
      }
    },
    async addEvent() {
      try {
        if (this.name && this.start && this.end) {
          await db.collection("calEvento").add({
            name: this.name,
            details: this.details,
            start: this.start,
            end: this.end,
            color: this.color,
            userEmail: this.getCurrentUserEmail
          });
          this.getEvents();
          this.name = "";
          this.details = "";
          this.start = "";
          this.end = "";
          this.color = "#1976D2";
        } else {
          alert("Campos obligatorios");
        }
      } catch (error) {
        console.log(error);
      }
    },

    async updateEvent(ev)
    {
        await db.collection('calEvento').doc(this.eventoEdit).update({
            details: ev.details
        })

        this.abrirSeleccionado = false;
        this.eventoEdit = null;
    },

    async deleteEvent(ev)
    {
        await db.collection('calEvento').doc(ev).delete()
        this.abrirSeleccionado = false;

        this.getEvents();
    },
    async agregarFavorito(ev, bool)
    {
        await db.collection('calEvento').doc(ev.id).update({
            favorito: bool
        })

        this.getEvents()
    },

    irFavorito(ev){
        this.focus = ev.start
        this.type="day"
    },
    editEvent(ev)
    {
        this.eventoEdit = ev.id
    },
    viewDay({ date }) {
      this.focus = date;
      this.type = "day";
    },
    getEventColor(event) {
      return event.color;
    },
    setToday() {
      this.focus = this.today;
    },
    prev() {
      this.$refs.calendar.prev();
    },
    next() {
      this.$refs.calendar.next();
    },
    showEvent({ nativeEvent, event }) {
      const open = () => {
        this.eventoSeleccionado = event;
        this.elementoSeleccionado = nativeEvent.target;
        requestAnimationFrame(() =>
          requestAnimationFrame(() => (this.abrirSeleccionado = true))
        );
      };

      if (this.abrirSeleccionado) {
        this.abrirSeleccionado = false;
        requestAnimationFrame(() => requestAnimationFrame(() => open()));
      } else {
        open();
      }

      nativeEvent.stopPropagation();
    },
  },
};
</script>

<style></style>
