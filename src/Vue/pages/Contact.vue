<template>
  <section id="contact" class="light-section">
    <div class="container-fluid">
      <h1 class="section-header">{{ heading }}</h1>
      <div class="row">
        <div
          class="col-sm-12 col-md-6 flex-col"
          data-aos="fade-right"
          data-aos-duration="1000"
          style="margin: 0 auto;"
        >
          <div class="contact-content">
            <h2>Connect with Me</h2>
            <div class="contact-text">{{ contact.text }}</div>

            <div class="contact-info">
              <ul class="list-group list-group-flush">
                <li v-if="contact.city !==''" class="list-group-item">
                  <h3 class="d-inline">
                    <i class="fas fa-map-marker-alt"></i> Location:
                  </h3>
                  <br class="d-md-none" />
                  <span>&nbsp; {{ contact.city }}</span>
                </li>
                <li class="list-group-item" v-if="contact.email !==''">
                  <h3 class="d-inline">
                    <i class="fa fa-envelope"></i> Email:
                  </h3>
                  <br class="d-md-none" />
                  <a :href="'mailto:'+ contact.email">
                    <span>{{ contact.email }}</span>
                  </a>
                </li>

                <li class="list-group-item" v-if="contact.phone !==''">
                  <h3 class="d-inline">
                    <i class="fas fa-phone"></i>  Phone:
                  </h3>
                  <br class="d-md-none" />
                  
                    <span>{{ contact.phone }}</span>
                  
                </li>
                <li class="list-group-item">
                  <h3 class="d-inline">
                    <i class="fas fa-user-plus"></i> Social:
                  </h3>
                  <br class="d-md-none" />

                  <div
                    v-for="(item, i) in social"
                    :key="i"
                    class="social-item social-spacing list-inline-item"
                  >
                    <a :href="item.url" :alt="item.name">
                      <i :class="'fa-lg '+item.faClass"> </i>
                    </a>
                  </div>
                </li>
                <li class="list-group-item" v-if="contact.resumeLink !==''">
                  <a :href="contact.resumeLink" target="_blank" alt="resume">
                  <button class="btn btn-resume"  target="_blank">
                    <i class="far fa-file-pdf"></i> Resume
                  </button>
                  </a>

                </li>
              </ul>
            </div>
          </div>
        </div>
        <div
          class="col-sm-12 col-md-6 flex-col"
          data-aos="fade-right"
          data-aos-duration="1000"
          v-if="contact.form"

        >
          <h2 v-if="contact.formTitle !==''">{{contact.formTitle}}</h2>



<!-- start of contact form  -->
<div class="container contact-form">
  <form @submit.prevent="handleSubmit">
    <!-- Name Field -->
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-user"></i>
          </span>
        </div>
        <input 
          v-model="formData.name"
          :class="{'is-invalid': errors.name}"
          type="text" 
          placeholder="Name" 
          class="form-control"
          required
        >
        <div class="invalid-feedback" v-if="errors.name">{{ errors.name }}</div>
      </div>
    </div>

    <!-- Email Field -->
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-envelope"></i>
          </span>
        </div>
        <input 
          v-model="formData.email"
          :class="{'is-invalid': errors.email}"
          type="email" 
          placeholder="Email" 
          class="form-control"
          required
        >
        <div class="invalid-feedback" v-if="errors.email">{{ errors.email }}</div>
      </div>
    </div>

    <!-- Phone Field (Optional) -->
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-phone"></i>
          </span>
        </div>
        <input 
          v-model="formData.phone"
          :class="{'is-invalid': errors.phone}"
          type="tel" 
          placeholder="Phone (Optional)" 
          class="form-control"
        >
        <div class="invalid-feedback" v-if="errors.phone">{{ errors.phone }}</div>
      </div>
    </div>

    <!-- Message Title -->
    <div class="form-group">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text">
            <i class="fa fa-heading"></i>
          </span>
        </div>
        <input 
          v-model="formData.title"
          :class="{'is-invalid': errors.title}"
          type="text" 
          placeholder="Message Title" 
          class="form-control"
          required
        >
        <div class="invalid-feedback" v-if="errors.title">{{ errors.title }}</div>
      </div>
    </div>

    <!-- Message -->
    <div class="form-group">
      <textarea 
        v-model="formData.message"
        :class="{'is-invalid': errors.message}"
        class="form-control" 
        rows="5" 
        placeholder="Message"
        required
      ></textarea>
      <div class="invalid-feedback" v-if="errors.message">{{ errors.message }}</div>
    </div>

    <!-- Submit Button -->
    <button 
      type="submit" 
      class="btn"
      :disabled="isSubmitting"
    >
      <span v-if="isSubmitting" class="spinner">
        <i class="fas fa-spinner fa-spin"></i>
      </span>
      <span v-else>
        <i class="fa fa-paper-plane"></i> 
        Send
      </span>
    </button>
  </form>

  <!-- Success/Error Messages -->
  <div v-if="submitStatus" :class="['alert', submitStatus.type === 'success' ? 'alert-success' : 'alert-danger']">
    {{ submitStatus.message }}
  </div>
</div>
<!-- end of contact form  -->




        </div>
      </div>
    </div>

    <div class="row arrow-container">
      <a class="arrow-icon" href="#">
        <i class="fas fa-chevron-up fa-4x"></i>
      </a>
    </div>

  </section>
</template>


<script>
import data from "../../data/data.json";

export default {
  name: "Contact",
  data() {
    return {
      contact: data.contact,
      social: data.contact.social,
      heading: data.main.headings.contact,
      formData: {
        name: '',
        email: '',
        phone: '',
        title: '',
        message: ''
      },
      errors: {
        name: '',
        email: '',
        phone: '',
        title: '',
        message: ''
      },
      isSubmitting: false,
      submitStatus: null
    };
  },
  methods: {
    validateForm() {
      let isValid = true;
      this.errors = {
        name: '',
        email: '',
        phone: '',
        title: '',
        message: ''
      };

      // Name validation
      if (!this.formData.name.trim()) {
        this.errors.name = 'Name is required';
        isValid = false;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!this.formData.email.trim()) {
        this.errors.email = 'Email is required';
        isValid = false;
      } else if (!emailRegex.test(this.formData.email)) {
        this.errors.email = 'Please enter a valid email address';
        isValid = false;
      }

      // Phone validation (optional)
      if (this.formData.phone) {
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        if (!phoneRegex.test(this.formData.phone)) {
          this.errors.phone = 'Please enter a valid phone number';
          isValid = false;
        }
      }

      // Title validation
      if (!this.formData.title.trim()) {
        this.errors.title = 'Message title is required';
        isValid = false;
      }

      // Message validation
      if (!this.formData.message.trim()) {
        this.errors.message = 'Message is required';
        isValid = false;
      } else if (this.formData.message.trim().length < 10) {
        this.errors.message = 'Message must be at least 10 characters long';
        isValid = false;
      }

      return isValid;
    },

    async handleSubmit() {
  if (!this.validateForm()) {
    this.submitStatus = {
      type: 'error',
      message: 'Please fix the errors in the form'
    };
    return;
  }

  this.isSubmitting = true;
  this.submitStatus = null;

  try {
    const response = await fetch('https://dp3t7qxhjj.execute-api.us-east-1.amazonaws.com/prod/contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // Remove 'Access-Control-Allow-Origin': '*' - this is a response header, not a request header
      },
      body: JSON.stringify(this.formData)
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Network response was not ok');
    }

    // Clear form
    this.formData = {
      name: '',
      email: '',
      phone: '',
      title: '',
      message: ''
    };

    this.submitStatus = {
      type: 'success',
      message: 'Message sent successfully! I will get back to you soon.'
    };

  } catch (error) {
    console.error('Submission error:', error);
    this.submitStatus = {
      type: 'error',
      message: 'Failed to send message. Please try again later.'
    };
  } finally {
    this.isSubmitting = false;
    
    if (this.submitStatus?.type === 'success') {
      setTimeout(() => {
        this.submitStatus = null;
      }, 5000);
    }
  }
}
  }
};
</script>


<style lang="scss">
#contact {
  background-color: #0d0e1a;
  padding: 4rem 0;
  min-height: 100vh;

  .container-fluid {
    width: 90%;
    max-width: 1400px;
    margin: 0 auto;
  }

  .section-header {
    font-size: 2.5rem;
    color: #fff;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 600;
    letter-spacing: 1px;
  }

  .contact-content {
    h2 {
      color: #ddd6fe;
      font-size: 2rem;
      margin-bottom: 1.5rem;
      font-weight: 500;
    }

    .contact-text {
      color: #e2e8f0;
      font-size: 1.1rem;
      line-height: 1.8;
      margin-bottom: 2rem;
    }
  }

  .list-group {
    .list-group-item {
      background-color: #1a1b2e;
      border: 1px solid rgba(147, 112, 219, 0.15);
      padding: 1rem 1.5rem;
      margin-bottom: 0.5rem;
      border-radius: 0.5rem;
      transition: all 0.3s ease;
      color: #fff;

      &:hover {
        transform: translateX(5px);
        background-color: #232442;
      }

      h3 {
        color: #ddd6fe;
        font-size: 1.1rem;
        margin-right: 0.5rem;

        i {
          color: #9ca3af;
          margin-right: 0.5rem;
          width: 20px;
          text-align: center;
        }
      }

      a {
        color: #9ca3af;
        text-decoration: none;
        transition: color 0.3s ease;

        &:hover {
          color: #ddd6fe;
        }
      }

      .social-item {
        display: inline-block;
        margin: 0.5rem 1rem 0.5rem 0;

        a {
          color: #9ca3af;
          transition: all 0.3s ease;

          &:hover {
            color: #ddd6fe;
            transform: translateY(-2px);
            display: inline-block;
          }
        }
      }
    }
  }

  .btn-resume {
    width: 100%;
    padding: 0.8rem 1.5rem;
    background-color: #4c1d95;
    border: none;
    color: white;
    border-radius: 0.5rem;
    font-size: 1.1rem;
    transition: all 0.3s ease;

    i {
      margin-right: 0.5rem;
    }

    &:hover {
      background-color: #5b21b6;
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(92, 33, 182, 0.2);
    }
  }

  .contact-form {
    background-color: #1a1b2e;
    padding: 2rem;
    border-radius: 1rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(147, 112, 219, 0.15);

    .form-group {
      margin-bottom: 1.5rem;
    }

    .input-group {
      .input-group-prepend {
        margin-right: 1rem;
        
        .input-group-text {
          background-color: transparent !important;
          border: none;
          padding-right: 1rem;
          color: #9ca3af;
          font-size: 1.1rem;
        }
      }
    }

    .form-control {
      background-color: #232442;
      border: 1px solid rgba(147, 112, 219, 0.1);
      color: #fff;
      padding: 0.8rem 1rem;
      border-radius: 0.5rem;
      font-size: 1rem;
      width: 100%;

      &:focus {
        box-shadow: 0 0 0 2px rgba(124, 58, 237, 0.2);
        border-color: rgba(124, 58, 237, 0.3);
        outline: none;
      }

      &::placeholder {
        color: #9ca3af;
        opacity: 0.8;
      }

      &.is-invalid {
        border-color: #ef4444;
        
        &:focus {
          box-shadow: 0 0 0 2px rgba(239, 68, 68, 0.2);
        }
      }
    }

    textarea.form-control {
      min-height: 150px;
      resize: vertical;
    }

    .invalid-feedback {
      display: block;
      color: #ef4444;
      font-size: 0.875rem;
      margin-top: 0.25rem;
    }

    .btn {
      width: 100%;
      padding: 0.8rem;
      background-color: #4c1d95;
      color: white;
      border: none;
      border-radius: 0.5rem;
      font-size: 1.1rem;
      transition: all 0.3s ease;

      i {
        margin-right: 0.5rem;
      }

      &:hover:not(:disabled) {
        background-color: #5b21b6;
        transform: translateY(-2px);
        box-shadow: 0 4px 12px rgba(92, 33, 182, 0.2);
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    .spinner {
      display: inline-block;
      margin-right: 0.5rem;
    }

    .alert {
      margin-top: 1rem;
      padding: 1rem;
      border-radius: 0.5rem;
      text-align: center;
      
      &.alert-success {
        background-color: rgba(52, 211, 153, 0.1);
        border: 1px solid rgba(52, 211, 153, 0.2);
        color: #34d399;
      }
      
      &.alert-danger {
        background-color: rgba(239, 68, 68, 0.1);
        border: 1px solid rgba(239, 68, 68, 0.2);
        color: #ef4444;
      }
    }
  }

  .arrow-container {
    margin-top: 3rem;
    text-align: center;

    .arrow-icon {
      color: #9ca3af;
      opacity: 0.8;
      transition: all 0.3s ease;

      &:hover {
        color: #ddd6fe;
        opacity: 1;
        transform: translateY(-5px);
      }
    }
  }

  @media (max-width: 768px) {
    .container-fluid {
      width: 95%;
    }

    .flex-col {
      margin-bottom: 2rem;
    }

    .contact-form {
      margin-top: 2rem;
    }

    .list-group-item {
      h3, span {
        display: block;
        margin-bottom: 0.5rem;
      }
    }
  }
}
</style>