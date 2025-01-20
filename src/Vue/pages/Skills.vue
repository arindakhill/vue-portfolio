<template>
  <section id="skills" class="light-section">
    <div class="container-fluid">
      <h1 class="section-header">{{ heading}}</h1>

      <!-- start of filters  -->
      <div class="row filters">
        <ul class="list-inline mx-auto" data-aos="fade-right" data-aos-duration="1000">
          <li v-for="item in skills" :key="item.category" class="list-inline-item filter">
            <a class="nav-item" :class="item.category === currentCategory ? 'active' : null"
              :data-category="item.category" @click="setCategory">{{ item.category }}</a>
          </li>
        </ul>
      </div>

      <!-- start of skill container  -->
      <div id="skill-container" data-aos="fade-right" data-aos-duration="1000"
        v-for="item in filteredSkills" :key="item.category">
        <div class="category-heading">
          <h2><i :class="item.faClass"></i> {{ item.category }}</h2>
          <h3 v-if="item.subtitle">{{ item.subtitle }}</h3>
        </div>

        <div class="skill-content">
          <!-- start of skill bars  -->
          <div v-if="item.skillList.length !== 0" class="skillbars">
            <div class="skill" v-for="skill in item.skillList" :key="skill.name">
              <h3 class="skill-name">
                {{ skill.name }}
                <span class="skill-percentage">{{ skill.level }}%</span>
              </h3>
              <div class="outer-bar">
                <div class="inner-bar" :style="{ width: skill.level + '%' }"></div>
              </div>
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
  name: "Skills",
  components: {
    Arrow,
  },
  data() {
    return {
      skills: data.skills.categories,
      heading: data.main.headings.skills,
      currentCategory: data.skills.defaultCategory,
    };
  },
  computed: {
    filteredSkills() {
      return this.skills.filter(x => x.category === this.currentCategory);
    },
  },
  methods: {
    setCategory(event) {
      this.currentCategory = event.target.dataset.category;
    },
  },
};
</script>

<style lang="scss">
.light-section {
  background-color: #0d0e1a;
  padding: 4rem 0;
  min-height: 100vh;
}

.container-fluid {
  width: 90%;
  max-width: 1400px;
  margin: 0 auto;
}

#skills {
  .section-header {
    font-size: 2.5rem;
    color: #240230; // Dark purple color
    text-transform: uppercase;
    text-align: center;
    margin-bottom: 3rem;
    font-weight: 600;
    letter-spacing: 1px;
    text-decoration: underline;
  text-decoration-color: #ed2024;
  text-decoration-thickness: 0.375rem;
  padding-bottom: 2rem;
    
    &::after { // Add red underline this way instead
      content: '';
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background-color: #ed2024;
    }
  }
}

/* Filters */
.filters {
  margin-bottom: 3rem;
  
  ul {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 1rem;
    padding: 0;
    margin: 0;
  }

  .filter {
    list-style: none;
    
    a {
      display: inline-block;
      padding: 0.75rem 1.5rem;
      background-color: #232442;
      color: #ddd6fe;
      border-radius: 0.5rem;
      cursor: pointer;
      transition: all 0.3s ease;
      text-decoration: none;
      
      &:hover {
        background-color: #372b7a;
        transform: translateY(-2px);
      }
      
      &.active {
        background-color: #7c3aed;
        color: #fff;
      }
    }
  }
}

/* Skill Container */
#skill-container {
  background-color: #232442;
  border-radius: 1rem;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  border: 1px solid rgba(147, 112, 219, 0.2);
  animation: fadeIn 0.5s ease-in-out;
  
  .category-heading {
    margin-bottom: 2rem;
    
    h2 {
      color: #fff;
      font-size: 1.75rem;
      font-weight: 600;
      margin-bottom: 0.5rem;
      display: flex;
      align-items: center;
      gap: 0.75rem;
      
      i {
        color: #a78bfa;
      }
    }
    
    h3 {
      color: #ddd6fe;
      font-size: 1.1rem;
      font-weight: normal;
    }
  }
}

/* Skill Bars */
/* Just update the .skillbars part */
.skillbars {
  display: grid;
  gap: 1.5rem;
  
  .skill {
    .skill-name {
      color: #fff;
      font-size: 1rem;
      margin-bottom: 0.5rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      
      .skill-percentage {
        color: #ddd6fe;
        font-size: 0.9rem;
      }
    }
    
    .outer-bar {
      height: 0.5rem;
      background-color: #1a1b36;
      border-radius: 1rem;
      overflow: hidden;
      
      .inner-bar {
        height: 100%;
        background: linear-gradient(90deg, #4c1d95, #7e22ce); // Darker purple gradient
        border-radius: 1rem;
        transition: width 1s ease-in-out;
        box-shadow: 0 0 10px rgba(124, 58, 237, 0.2); // Subtle glow
      }
    }
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 768px) {
  .container-fluid {
    width: 95%;
  }
  
  .filters ul {
    gap: 0.5rem;
  }
  
  .filter a {
    padding: 0.5rem 1rem;
    font-size: 0.9rem;
  }
  
  #skill-container {
    padding: 1.5rem;
  }
}
</style>