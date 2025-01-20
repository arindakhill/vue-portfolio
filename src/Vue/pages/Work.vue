<template>
    <section id="work" class="dark-section">
      <div class="container-fluid">
        <h1 class="section-header">{{ heading }}</h1>
  
        <div class="timeline">
          <div v-for="(job, index) in work" :key="index" class="timeline-item" 
            data-aos="fade-right" data-aos-duration="1000">
            
            <!-- Company Logo -->
            <div class="company-logo">
              <a :href="job.website"
                target="_blank"
                rel="noopener noreferrer"
                class="company-link">
              <img :src="job.icon" :alt="job.company" class="logo-img"/>
              </a>
            </div>
  
            <!-- Work Details -->
            <div class="work-content">
              <a :href="job.website"
                target="_blank"
                rel="noopener noreferrer"
                class="company-link">
              <div class="work-header">
                <h3 class="position">{{ job.position }}</h3>
                <span class="duration">{{ job.duration }}</span>
              </div>
  
              <div class="company-info">
               
                <h4 class="company">{{ job.company }}</h4>
                <p class="location">{{ job.location }}</p>
              </div>
            </a>
              <!-- Responsibilities -->
              <div class="responsibilities">
                <p v-if="!Array.isArray(job.responsibilities)" class="responsibility">
                  {{ job.responsibilities }}
                </p>
                <ul v-else>
                  <li v-for="(responsibility, idx) in job.responsibilities" 
                      :key="idx" class="responsibility">
                    {{ responsibility }}
                  </li>
                </ul>
              </div>
  
              <!-- Skills Used -->
              <div class="skills-used">
                <span v-for="(skill, skillIdx) in job.skills" 
                      :key="skillIdx" class="skill-tag">
                  {{ skill }}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Arrow />
    </section>
  </template>
  
  <script>
  import data from "../../data/data.json";
  import Arrow from "../components/Arrow.vue";
  
  export default {
    name: "Work",
    components: {
      Arrow,
    },
    data() {
      return {
        work: data.work,
        heading: data.main.headings.Work,
      };
    },
  };
  </script>
  
  <style lang="scss">
  #work {
    background-color: #0d0e1a;
    min-height: 100vh;
    padding: 4rem 0;
  
    .container-fluid {
      width: 90%;
      max-width: 1400px;
      margin: 0 auto;
      padding: 2rem;
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
  
    .timeline {
      position: relative;
      padding: 2rem 0;
  
      &::before {
        content: '';
        position: absolute;
        left: 1.5rem;
        top: 0;
        height: 100%;
        width: 2px;
        background: rgba(147, 112, 219, 0.2);
      }
    }
  
    .timeline-item {
      display: flex;
      gap: 2rem;
      margin-bottom: 3rem;
      position: relative;
      padding-left: 3rem;
  
      &:last-child {
        margin-bottom: 0;
      }
  
      .company-logo {
        position: absolute;
        left: 0;
        width: 3rem;
        height: 3rem;
        background: #1a1b2e;
        border-radius: 50%;
        border: 2px solid rgba(147, 112, 219, 0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
  
        .logo-img {
          width: 70%;
          height: 70%;
          object-fit: contain;
        }
      }
  
      .work-content {
        flex: 1;
        background: #1a1b2e;
        border-radius: 1rem;
        padding: 1.5rem;
        border: 1px solid rgba(148, 112, 219, 0.072);
        transition: transform 0.3s ease;
  
        &:hover {
          transform: translateY(-5px);
        }
  
        .work-header {
          display: flex;
          justify-content: center;//give me optins;
          align-items: center;
          margin-bottom: 0.5rem;
  
          .position {
            color: #fff;
            font-size: 1.25rem;
            font-weight: 600;
            margin-right: 2rem;
          }
  
          .duration {
            color: #9ca3af;
            font-size: 0.9rem;
          }
        }
  
        .company-info {
          margin-bottom: 1rem;
  
          .company {
            color: #ddd6fe;
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
          }
  
          .location {
            color: #9ca3af;
            font-size: 0.9rem;
          }
        }
  
        .responsibilities {
          color: #e2e8f0;
          margin-bottom: 1.5rem;
          
          ul {
            list-style: none;
            padding-left: 0;
            
            li {
              position: relative;
              padding-left: 1.5rem;
              margin-bottom: 0.75rem;
              line-height: 1.6;
  
              &::before {
                content: '•';
                position: absolute;
                left: 0;
                color: #9ca3af;
              }
            }
          }
        }
  
        .skills-used {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
  
          .skill-tag {
            background: #232442;
            color: #ddd6fe;
            padding: 0.25rem 0.75rem;
            border-radius: 1rem;
            font-size: 0.9rem;
            border: 1px solid rgba(147, 112, 219, 0.2);
          }
        }
      }
    }
  
    @media (max-width: 768px) {
      .container-fluid {
        width: 95%;
        padding: 1rem;
      }
  
      .timeline-item {
        padding-left: 2.5rem;
  
        .company-logo {
          width: 2.5rem;
          height: 2.5rem;
        }
  
        .work-content {
          .work-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 0.5rem;
          }
        }
      }
    }
  }
  </style>