<template>
  <div class="calender-file__container">
    <header class="calender-file__header">
      <h1 class="calender-file__header-title">
        Generate
      </h1>
      <img
        class="calender-file__header-logo"
        :src="require('@/assets/icons/ics-logo.svg')"
      />
    </header>
    <form @submit.prevent class="calender-file__form">
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Assunto:
        </label>
        <input
          v-model="event.subject"
          class="calender-file__form__form-control"
          type="text"
        />
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Localização:
        </label>
        <input
          type="text"
          v-model="event.location"
          class="calender-file__form__form-control"
        />
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Data de início:
        </label>
        <datetime
          v-model="event.startDate"
          class="calender-file__form__form-control--datetime"
          type="datetime"
          format="dd/MM/yyyy hh:mm a"
        />
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Data de término:
        </label>
        <datetime
          v-model="event.endDate"
          class="calender-file__form__form-control--datetime"
          type="datetime"
          format="dd/MM/yyyy hh:mm a"
        />
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Descrição:
        </label>
        <textarea
          rows="5"
          v-model="event.description"
          class="calender-file__form__form-control"
        />
      </div>
      <div class="calender-file__form__form-group btn-container">
        <button
          class="calender-file__form__form-btn"
          @click="generate"
        >
          Gerar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ics from '@/assets/js/ics';

export default {
  data () {
    return {
      loading: false,
      event: {
        subject: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
      }
    };
  },
  methods: {
    generate () {
      const cal = ics();
      const {
        subject,
        description,
        location,
        startDate,
        endDate,
      } = this.event;

      cal.addEvent(subject, description, location, startDate, endDate);
      cal.download();
    },
  }
};
</script>

<style>
* {
  font-family: 'Montserrat', Verdana, Tahoma, sans-serif;
}

html, body {
  height: 100%;
  width: 100%;
}

body {
  margin: 0px;
}

.calender-file__container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100%;
  width: 100%;
  background-image: linear-gradient(to right, #3c3b3f, #605c3c);
  padding: .1px;
}

.calender-file__header {
  display: flex;
  align-items: center;
  color: #fff;
  margin-top: 24px;
}

.calender-file__header-title {
  font-size: 48px;
  margin: 0px;
  margin-right: 8px;
}

.calender-file__header-logo {
  width: 60px;
  height: 60px;
  transition: all .2s;
}

.calender-file__form {
  min-height: 500px;
  width: 400px;
  background-color: #fff;
  padding: 24px;
  box-sizing: border-box;
  margin: 24px 0px;
  border-radius: 5px;
}

.calender-file__form__form-group {
  margin-bottom: 24px;
  padding: .1px;
}

.calender-file__form__form-control {
  display: block;
  padding: 12px;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 2px;
  border: 2px solid rgba(0,0,0,.3);
  resize: none;
  outline: none;
}

.calender-file__form__form-control--datetime {
  display: block;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 2px;
  border: 2px solid rgba(0,0,0,.3);
  resize: none;
  outline: none;
}

.calender-file__form__form-control--datetime input {
  padding: 12px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: none;
}

.calender-file__form__form-label {
  display: inline-block;
  font-size: 14px;
  margin-bottom: 8px;
}

.btn-container {
  display: flex;
  justify-content: flex-end;
}

.calender-file__form__form-btn {
  padding: 16px 32px;
  background-color: #4286f4;
  border: none;
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  cursor: pointer;
  outline: none;
}

.calender-file__form__form-btn:hover {
  background-color: #3d77d4;
}

.calender-file__form__form-btn:active {
  background-color: #2e5799;
}

@media (max-width: 768px) {
  .calender-file__form {
    min-height: 500px;
    width: 100%;
    border-radius: 0px;
    margin-bottom: 0px;
  }
  
  .calender-file__header-title {
    display: none;
  }

  .calender-file__header-logo {
    width: 110px;
    height: 110px;
  }
}
</style>
