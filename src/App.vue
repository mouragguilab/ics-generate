<template>
  <div class="calender-file__container">
    <header class="calender-file__header">
      <h1 class="calender-file__header-title">
        Generator
      </h1>
      <img
        class="calender-file__header-logo"
        :src="require('@/assets/icons/ics-logo.svg')"
      />
    </header>
    <form @submit.prevent class="calender-file__form">
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Novo do Evento
        </label>
        <input
          type="text"
          v-model="$v.event.name.$model"
          class="calender-file__form__form-control"
          :class="{
            'form-control--error': $v.event.name.$dirty && $v.event.name.$invalid,
          }"
        />
        <template v-if="$v.event.name.$dirty">
          <span
            v-if="!$v.event.name.required"
            class="calender-file__form__form-alert form-alert--error"
          >
            Campo obrigatório
          </span>
        </template>
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Localização
        </label>
        <input
          type="text"
          v-model="$v.event.location.$model"
          class="calender-file__form__form-control"
          :class="{
            'form-control--error': $v.event.location.$dirty && $v.event.location.$invalid,
          }"
        />
        <template v-if="$v.event.location.$dirty">
          <span
            v-if="!$v.event.location.required"
            class="calender-file__form__form-alert form-alert--error"
          >
            Campo obrigatório
          </span>
        </template>
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Data de início
        </label>
        <datetime
          type="datetime"
          format="dd/MM/yyyy hh:mm a"
          v-model="$v.event.startDate.$model"
          class="form-control--datetime"
          :class="{
            'form-control--error': $v.event.startDate.$dirty && $v.event.startDate.$invalid,
          }"
        />
        <template v-if="$v.event.startDate.$dirty">
          <span
            v-if="!$v.event.startDate.required"
            class="calender-file__form__form-alert form-alert--error"
          >
            Campo obrigatório
          </span>
        </template>
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Data de término
        </label>
        <datetime
          type="datetime"
          format="dd/MM/yyyy hh:mm a"
          v-model="$v.event.endDate.$model"
          class="form-control--datetime"
          :class="{
            'form-control--error': $v.event.endDate.$dirty && $v.event.endDate.$invalid,
          }"
        />
        <template v-if="$v.event.endDate.$dirty">
          <span
            v-if="!$v.event.endDate.required"
            class="calender-file__form__form-alert form-alert--error"
          >
            Campo obrigatório
          </span>
        </template>
      </div>
      <div class="calender-file__form__form-group">
        <label class="calender-file__form__form-label" for="">
          Descrição
        </label>
        <textarea
          rows="5"
          v-model="$v.event.description.$model"
          class="calender-file__form__form-control"
          :class="{
            'form-control--error': $v.event.description.$dirty && $v.event.description.$invalid,
          }"
        />
        <template v-if="$v.event.description.$dirty">
          <span
            v-if="!$v.event.description.required"
            class="calender-file__form__form-alert form-alert--error"
          >
            Campo obrigatório
          </span>
        </template>
      </div>
      <div class="calender-file__form__form-group btn-container">
        <button
          @click="generate"
          :disabled="loading"
          class="calender-file__form__form-btn"
        >
          Gerar
        </button>
      </div>
    </form>
  </div>
</template>

<script>
import ics from '@/assets/js/ics';
import { required } from 'vuelidate/lib/validators';

export default {
  data () {
    return {
      loading: false,
      event: {
        name: '',
        description: '',
        location: '',
        startDate: '',
        endDate: '',
      }
    };
  },
  mounted () {
    this.$v.$reset();
  },
  methods: {
    generate () {
      this.$v.event.$touch();
      if (this.$v.event.$invalid) {
        return;
      }

      this.loading = true;
      try {
        const cal = ics();
        const {
          name,
          description,
          location,
          startDate,
          endDate,
        } = this.event;
  
        cal.addEvent(name, description, location, startDate, endDate);
        cal.download();

      } catch (err) {
        console.log(`An error occurred during the event creation process: ${err}`);
        
      } finally {
        this.loading = false;
      }
    },

  },
  validations: {
    event: {
      name: {
        required,
      },
      description: {
        required,
      },
      location: {
        required,
      },
      startDate: {
        required,
      },
      endDate: {
        required,
      },
    },
  },
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
  position: relative;
  margin-bottom: 32px;
  padding: .1px;
}

.calender-file__form__form-label {
  display: inline-block;
  font-size: 14px;
  margin-bottom: 8px;
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

.form-control--error {
  border-color: #B43232 !important;
}

.form-control--datetime {
  display: block;
  width: 100%;
  font-size: 16px;
  box-sizing: border-box;
  border-radius: 2px;
  border: 2px solid rgba(0,0,0,.3);
  resize: none;
  outline: none;
}

.form-control--datetime input {
  padding: 12px;
  height: 100%;
  width: 100%;
  box-sizing: border-box;
  border: none;
}

.calender-file__form__form-alert {
  position: absolute;
  top: calc(100% + 4px);
  font-size: 12px;
}

.form-alert--error {
  color: #B43232;
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
  user-select: none;
  transition: all .3s;
}

.calender-file__form__form-btn:disabled {
  pointer-events: none;
  background-color: rgba(0, 0, 0, 0.247);
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
