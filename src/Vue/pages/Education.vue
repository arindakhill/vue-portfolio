<template>
    <section id="education" class="light-purple-background">
      <div class="container">
        <h1 class="section-header">{{ heading }}</h1>
  
        <!-- Education Timeline -->
        <div class="education-timeline">
          <div
            v-for="(item, index) in educationList"
            :key="index"
            class="timeline-item"
          >
            <!-- Timeline Icon -->
            <div
              :class="['timeline-icon', { 'right': item.position === 'right', 'left': item.position === 'left' }]">
              <a :href="item.website" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="institution-link">
              <img :src="item.icon" alt="University Icon" class="university-icon"/>
              </a>
            </div>
            <!-- Timeline Content Box -->
            <div :class="['timeline-content', { 'right': item.position === 'right', 'show-courses': item.showCourses }]">
              <a :href="item.website" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  class="institution-link">
              <h3>{{ item.degree }}</h3>
             
              <p>{{ item.institution }} - {{ item.location }}</p>
                  </a>
              <p>{{ item.duration }}</p>
              <div v-if="item.showCourses">
                <p class="courses-title">Courses:</p>
                <ul>
                  <li v-for="(course, i) in item.courses" :key="i">{{ course }}</li>
                </ul>
              </div>
              <button @click="toggleCourses(index)">
                {{ item.showCourses ? 'Hide' : 'Show' }} Courses ({{ item.courses.length }})
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script>
  import data from "../../data/data.json";
  
  export default {
    name: "Education",
    data() {
      return {
        heading: data.main.headings.Education,
        educationList: data.about.education.map(item => ({
          degree: item.degree,
          institution: item.institution,
          website: item.website,
          location: item.location,
          duration: item.duration,
          icon: item.icon, // University icon
          position: item.position || 'right', // Left or Right position of the content
          courses: item.courses || [], // Courses associated with the degree
          showCourses: false, // Initially not showing courses
        })),
      };
    },
    methods: {
      toggleCourses(index) {
        this.educationList[index].showCourses = !this.educationList[index].showCourses;
      },
    },
  };
  </script>
  
 <style lang="scss">
 /* Darker Background */
.light-purple-background {
  background-color: #0d0e1a; // Slightly brighter dark background
  padding: 4rem 0;
  min-height: 100vh;
}

/* Container with timeline line */
.container {
  width: 80%;
  margin: 0 auto;
  max-width: 1200px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 50%;
    width: 2px;
    height: 100%;
    background: rgba(147, 112, 219, 0.3); // Brighter line
    transform: translateX(-50%);
  }
}

.section-header {
  font-size: 2rem;
  color: #fff;
  text-transform: uppercase;
  text-align: center;
  margin-bottom: 3rem;
  font-weight: 600;
}

/* Education Timeline */
.education-timeline {
  display: flex;
  flex-direction: column;
  gap: 4rem;
}

.timeline-item {
  display: flex;
  align-items: center;
  gap: 2rem;
  position: relative;
  width: 100%;
}

/* Icon Styling */
.timeline-icon {
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
  background-color: #232442; // Slightly brighter
  border: 2px solid rgba(147, 112, 219, 0.6); // More visible border
  position: absolute;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 15px rgba(147, 112, 219, 0.3);
  padding: 0.5rem;
  transition: all 0.3s ease;

  &:hover {
    background-color: #2d1b69;
    transform: scale(1.1);
    
    .university-icon {
      filter: invert(1);
      opacity: 1;
    }
  }
}

.university-icon {
  width: 70%;
  height: 70%;
  filter: invert(1) brightness(0.9) sepia(0.3) saturate(1) hue-rotate(230deg);
  opacity: 0.95;
  transition: all 0.3s ease;
}

/* Content Box Styling */
.timeline-content {
  background-color: #232442; // Slightly brighter
  color: #fff;
  border-radius: 8px;
  padding: 1.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
  width: calc(50% - 3rem);
  margin-left: auto;
  border: 1px solid rgba(147, 112, 219, 0.4); // More visible border
  position: relative;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  &.right {
    margin-left: 0;
    margin-right: auto;
  }

  h3 {
    font-size: 1.5rem;
    margin-bottom: 0.75rem;
    color: #fff;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 0.5px;
  }

  p {
    color: #e2e8f0; // Brighter text
    margin-bottom: 0.5rem;
    line-height: 1.6;

    &:first-of-type {
      color: #ddd6fe; // Brighter purple text
      font-size: 1.1rem;
    }
  }

  ul {
    list-style-type: none;
    padding-left: 0;
    margin: 1rem 0;
    counter-reset: course-counter;
    display: none; // Hidden by default
    
    li {
      color: #e2e8f0; // Brighter text
      margin-bottom: 0.5rem;
      padding-left: 2rem;
      position: relative;
      counter-increment: course-counter;

      &::before {
        content: counter(course-counter) ".";
        color: #a78bfa; // Brighter purple
        position: absolute;
        left: 0;
        font-weight: 500;
      }
    }
  }

  &.show-courses ul {
    display: block; // Show when class is added
  }
}

/* Button Styling */
button {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border-radius: 6px;
  background-color: #1a1b36; // Slightly brighter
  color: #ddd6fe; // Brighter text
  border: 1px solid rgba(147, 112, 219, 0.4);
  cursor: pointer;
  transition: all 0.3s ease;
  margin-top: 1rem;
  opacity: 0.95;

  &:hover {
    background-color: #372b7a; // Brighter hover
    color: #fff;
    opacity: 1;
  }
}

/* Timeline Icon Positioning */
.timeline-icon.left {
  left: calc(50% - 1.5rem);
}

.timeline-icon.right {
  right: calc(50% - 1.5rem);
}

/* Responsive Design */
@media (max-width: 768px) {
  .container {
    width: 90%;

    &::after {
      left: 2rem;
    }
  }

  .timeline-content {
    width: calc(100% - 4rem);
    margin-left: 4rem !important;
  }

  .timeline-icon {
    left: 0.5rem !important;
    right: auto !important;
  }
}
  </style>
  