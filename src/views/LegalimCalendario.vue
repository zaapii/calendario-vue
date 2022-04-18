<template>
  <div>
    <v-overlay :value="overlay">
      <v-progress-circular indeterminate size="64"></v-progress-circular>
    </v-overlay>
    <v-row class="fill-height">
      <v-col>
        <v-sheet height="120">
          <v-toolbar-title v-if="$refs.calendar">
            {{ $refs.calendar.title.toUpperCase() }}
          </v-toolbar-title>
          <v-toolbar flat>
            <v-btn
              :small="$vuetify.breakpoint.mobile"
              color="primary"
              dark
              class="mr-4"
              @click="dialog = true"
              >Nuevo</v-btn
            >
            <v-btn
              :small="$vuetify.breakpoint.mobile"
              outlined
              class="mr-4"
              color="grey darken-2"
              @click="setToday"
            >
              Hoy
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="prev">
              <v-icon small> mdi-arrow-left-box </v-icon>
            </v-btn>
            <v-btn fab text small color="grey darken-2" @click="next">
              <v-icon small> mdi-arrow-right-box </v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-menu bottom right>
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  :small="$vuetify.breakpoint.mobile"
                  outlined
                  color="grey darken-2"
                  v-bind="attrs"
                  v-on="on"
                >
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

          <v-dialog v-model="dialog" max-width="600">
            <v-card>
              <v-container>
                <v-form @submit.prevent="addEvent">
                  <v-row>
                    <v-col>
                      <v-chip label outlined color="primary">Inicio</v-chip>
                      <vc-date-picker
                        class="mb-8 mt-4"
                        :min-date="new Date()"
                        v-model="start"
                        :mode="!isChecked ? 'dateTime' : 'date'"
                        is24hr
                      />
                    </v-col>
                    <v-col>
                      <v-chip label outlined color="primary">Fin</v-chip>
                      <vc-date-picker
                        class="mb-8 mt-4"
                        v-model="end"
                        :mode="!isChecked ? 'dateTime' : 'date'"
                        is24hr
                      />
                    </v-col>
                  </v-row>
                  <v-radio-group v-model="isChecked">
                    <v-radio
                      label="Con hora de Inicio y Fin"
                      color="indigo"
                      :value="false"
                    ></v-radio>
                    <v-radio
                      label="Evento de Todo el día"
                      color="red"
                      :value="true"
                    ></v-radio>
                  </v-radio-group>
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
                <v-btn @click="deleteEvent(eventoSeleccionado)" icon>
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
                <v-toolbar-title
                  v-html="eventoSeleccionado.name"
                ></v-toolbar-title>
                <v-spacer></v-spacer>
                <v-btn icon>
                  <v-icon @click="agregarFavorito(eventoSeleccionado, true)"
                    >mdi-heart</v-icon
                  >
                </v-btn>
              </v-toolbar>
              <v-card-text>
                <form
                  v-if="eventoEdit !== eventoSeleccionado.id"
                  style="color: #a39f9e"
                >
                  {{ eventoSeleccionado.details }}
                </form>
                <form v-else>
                  <textarea-autosize
                    v-model="eventoSeleccionado.details"
                    type="text"
                    style="width: 100%"
                    :min-height="100"
                    placeholder="Agregar Nota"
                  />
                </form>
              </v-card-text>
              <v-card-actions>
                <v-btn
                  v-if="eventoEdit !== eventoSeleccionado.id"
                  @click.prevent="editEvent(eventoSeleccionado)"
                  text
                  color="success"
                >
                  Edit
                </v-btn>
                <v-btn
                  v-else
                  @click.prevent="updateEvent(eventoSeleccionado)"
                  text
                  color="success"
                  @click="abrirSeleccionado = false"
                >
                  Guardar
                </v-btn>
                <v-btn
                  text
                  color="secondary"
                  @click="abrirSeleccionado = false"
                >
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
          <v-card-title> Eventos Favoritos </v-card-title>
          <v-container>
            <div
              style="margin: 10px"
              v-for="evento in this.events"
              :key="evento.id"
            >
              <v-chip
                @click="irFavorito(evento)"
                v-if="evento.favorito"
                close
                @click:close="agregarFavorito(evento, false)"
                label
                dark
                :color="evento.color"
              >
                {{ evento.name }}
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
import { mapGetters } from "vuex";
import axios from "axios";

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
    timeZone: "Etc/UTC",
    isChecked: false,
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
  }),
  created() {
    this.$root.$refs.C = this;
    this.getEvents();
  },

  mounted() {
    this.$refs.calendar.checkChange();
  },
  computed: {
    ...mapGetters([
      "getCurrentUserEmail",
      "getCurrentUserToken",
      "getGoogleCalendarEvents",
    ]),
  },
  methods: {
    async getEvents() {
      try {
        this.overlay = true;
        const snapshot = await db
          .collection("calEvento")
          .where("userEmail", "==", this.getCurrentUserEmail)
          .get();
        const events = [];
        snapshot.forEach((doc) => {
          let appData = doc.data();
          appData.id = doc.id;
          events.push(appData);
        });
        this.events = events;

        if (this.getGoogleCalendarEvents !== null) {
          this.getGoogleCalendarEvents.forEach((evento) => {
            let details;
            if (
              evento.status !== "cancelled" &&
              evento.start.dateTime !== undefined
            ) {
              if (evento.description !== undefined) {
                details = evento.description;
              }
              let start =
                evento.start.dateTime.split("T")[0] +
                " " +
                evento.start.dateTime.split("T")[1].substring(0, 5);
              let end =
                evento.end.dateTime.split("T")[0] +
                " " +
                evento.end.dateTime.split("T")[1].substring(0, 5);
              let name = evento.summary;
              let color =
                "#" + Math.floor(Math.random() * 16777215).toString(16);
              let nuevoEventoGoogle = {
                start,
                end,
                name,
                color,
                details,
                isFromGoogle: true,
              };
              this.events.push(nuevoEventoGoogle);
            }
          });
        }
        this.overlay = false;
      } catch (error) {
        alert("an error ocurred");
        this.overlay = false;
        console.log(error);
      }
    },
    async addEvent() {
      try {
        // LOADING TRUE
        this.overlay = true;
        // ---------- //

        if (this.name && this.start && this.end) {
          this.start.setHours(
            this.start.getHours() - new Date().getTimezoneOffset() / 60
          );
          this.end.setHours(
            this.end.getHours() - new Date().getTimezoneOffset() / 60
          );
          await db.collection("calEvento").add({
            name: this.name,
            details: this.details,
            start:
              this.start.toISOString().split("T")[0] +
              " " +
              this.start.toISOString().split("T")[1].substring(0, 5),
            end:
              this.end.toISOString().split("T")[0] +
              " " +
              this.end.toISOString().split("T")[1].substring(0, 5),
            color: this.color,
            userEmail: this.getCurrentUserEmail,
            isFromGoogle: false,
          });
          const data = {
            start: {
              dateTime: this.start.toISOString(),
            },
            end: {
              dateTime: this.end.toISOString(),
            },
            summary: this.details,
            description: this.name,
          };
          const config = {
            headers: {
              Authorization: `Bearer ${this.getCurrentUserToken}`,
            },
          };
          axios
            .post(
              `https://www.googleapis.com/calendar/v3/calendars/${this.getCurrentUserEmail}/events`,
              data,
              config
            )
            .then((response) => {
              if (response.status === 200) {
                const Toast = this.$swal.mixin({
                  toast: true,
                  position: "top",
                  showConfirmButton: false,
                  timer: 2000,
                  timerProgressBar: true,
                  didOpen: (toast) => {
                    toast.addEventListener("mouseenter", this.$swal.stopTimer);
                    toast.addEventListener(
                      "mouseleave",
                      this.$swal.resumeTimer
                    );
                  },
                });
                Toast.fire({
                  icon: "success",
                  title: "¡Evento Agregado Correctamente!",
                });
              }
            });
          this.getEvents();
          this.name = "";
          this.details = "";
          this.start = "";
          this.end = "";
          this.color = "#1976D2";

          // LOADING FALSE
          this.overlay = false;
          // ----------- //
        } else {
          alert("Campos obligatorios");
        }
      } catch (error) {
        console.log(error);
      }
    },

    ocultarGoogle() {
      this.events = this.events.filter((evento) => {
        return evento.isFromGoogle === false;
      });
    },

    async updateEvent(ev) {
      if (!ev.isFromGoogle) {
        await db.collection("calEvento").doc(this.eventoEdit).update({
          details: ev.details,
        });
        this.abrirSeleccionado = false;
        this.eventoEdit = null;
      } else alert("No puede editar un Evento de Google");
    },

    async deleteEvent(ev) {
      if (!ev.isFromGoogle) {
        await db.collection("calEvento").doc(ev.id).delete();
        this.abrirSeleccionado = false;

        this.getEvents();
      } else alert("No puede eliminar un Evento de Google");
    },
    async agregarFavorito(ev, bool) {
      await db.collection("calEvento").doc(ev.id).update({
        favorito: bool,
      });

      this.getEvents();
    },

    irFavorito(ev) {
      this.focus = ev.start;
      this.type = "day";
    },
    editEvent(ev) {
      this.eventoEdit = ev.id;
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
