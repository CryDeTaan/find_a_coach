<template>
  <form @submit.prevent="submitForm">
    <div class="form-control" :class="{ invalid: !email.isValid }">
      <label for="email">Your Email Address</label>
      <input
        id="email"
        type="email"
        v-model.trim="email.value"
        @keyup="clearError('email')"
      />
      <p v-if="!email.isValid" class="invalid">Email must not be empty.</p>
    </div>
    <div class="form-control" :class="{ invalid: !message.isValid }">
      <label for="message">Write a message to the coach.</label>
      <textarea
        id="message"
        rows="5"
        v-model.trim="message.value"
        @keyup="clearError('message')"
      />
      <p v-if="!message.isValid" class="invalid">Message must not be empty.</p>
      <p v-if="!formValid" class="invalid">
        Please fix the above errors and submit again.
      </p>
    </div>
    <div class="actions">
      <base-button>Send Message</base-button>
    </div>
  </form>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'ContactCoach',

  data() {
    return {
      email: {
        value: '',
        isValid: true,
      },
      message: {
        value: '',
        isValid: true,
      },
      formValid: true,
    };
  },

  methods: {
    ...mapActions('requests', ['contactCoach']),
    clearError(input) {
      this[input].isValid = true;
      this.formValid = true;
    },
    validateForm() {
      if (this.email.value === '') {
        this.email.isValid = false;
        this.formValid = false;
      }
      if (this.message.value === '') {
        this.message.isValid = false;
        this.formValid = false;
      }
    },
    submitForm() {
      this.validateForm();

      if (!this.formValid) {
        return;
      }

      const formData = {
        coachId: this.$route.params.id,
        email: this.email.value,
        message: this.message.value,
      };

      this.contactCoach(formData);

      this.$router.replace('/coaches');
    },
  },
};
</script>

<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}
.form-control {
  margin: 0.5rem 0;
}
label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}
input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}
input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}
.errors {
  font-weight: bold;
  color: red;
}
.actions {
  text-align: center;
}
.invalid p {
  color: red;
}

.invalid input,
.invalid textarea {
  border: 1px solid red;
}
</style>
