<template>
  <div id="app">
    <Header />
    <About />
    <Education />
    <Work />
    <Skills />
    <Portfolio />
    <Blog />
    <Contact />
    <Footer />
    <ChatBot />
  </div>
</template>

<script>
import Header from "./Vue/pages/Header.vue";
import About from "./Vue/pages/About.vue";
import Skills from "./Vue/pages/Skills.vue";
import Portfolio from "./Vue/pages/Portfolio.vue";
import Contact from "./Vue/pages/Contact.vue";
import Footer from "./Vue/pages/Footer.vue";
import Education from "./Vue/pages/Education.vue";
import Work from "./Vue/pages/Work.vue";
import Blog from "./Vue/pages/Blog.vue";
import ChatBot from './Vue/components/ChatBot.vue'


export default {
  name: "App",
  components: {
    Header,
    About,
    Education,
    Work,
    Skills,
    Portfolio,
    Blog,
    Contact,
    Footer,
    ChatBot
  },
};
</script>

<style>
@import "./styles/css/main.css";
</style>
