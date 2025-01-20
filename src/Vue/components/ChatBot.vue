<template>
  <div class="chat-widget" :class="{ 'chat-widget--open': isChatOpen }">
    <!-- Audio Elements -->
    <audio id="notificationSound" src="../../assets/sounds/message1.mp3" preload="auto"></audio>
    <audio id="popupSound" src="../../assets/sounds/popup.mp3" preload="auto"></audio>
    <audio id="errorSound" src="../../assets/sounds/error.mp3" preload="auto"></audio>

    <!-- Chat Toggle Button -->
    <button class="chat-widget__toggle" @click="toggleChat">
      <div class="chat-toggle-content">
        <img :src="profileImage" alt="Assistant Profile" class="toggle-avatar" />
        <span class="toggle-text">Chat with me</span>
      </div>
    </button>

    <!-- Chat Bubble -->
    <div v-if="showBubble && !isChatOpen" class="chat-bubble">
      <div class="chat-bubble__content">
        Hey there! Wanna chat with Rindzo (Hillary's genius sidekick)? 👋
      </div>
      <div class="chat-bubble__close" @click.stop="closeBubble">
        <i class="fas fa-times"></i>
      </div>
    </div>

    <!-- Chat Window -->
    <div class="chat-window" v-show="isChatOpen">
      <!-- Chat Header -->
      <div class="chat-window__header">
        <div class="chat-window__profile">
          <img :src="profileImage" alt="Bot Profile" class="chat-window__avatar" />
          <div class="chat-window__info">
            <h3>Hillary's AI Assistant</h3>
            <p>Ask me anything about Hillary's experience, skills, or projects!</p>
          </div>
        </div>
        <button class="chat-window__close" @click="toggleChat">
          <i class="fas fa-times"></i>
        </button>
      </div>

      <!-- Chat Messages -->
      <div class="chat-window__messages" ref="messageContainer">
        <div v-for="(message, index) in messages" 
             :key="index" 
             :class="['message', `message--${message.sender}`]">
          <div class="message__content">
            {{ message.text }}
          </div>
          <div v-if="message.sender === 'bot'" class="message__typing" v-show="isTyping">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      <!-- Chat Input -->
      <div class="chat-window__input">
        <input 
          type="text" 
          v-model="userInput" 
          placeholder="Type your message..." 
          @keyup.enter="sendMessage"
          :disabled="isTyping"
        />
        <button @click="sendMessage" :disabled="isTyping || !userInput.trim()">
          <i class="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatBot',
  data() {
    return {
      isChatOpen: false,
      messages: [],
      userInput: '',
      isTyping: false,
      profileImage: require('../../assets/images/profile-pic.png'),
      notificationSound: null,
      errorSound:null,
      isPageLoaded: false,
      popupSound: null,
      popupTimeout: null,
      hasUserInteracted: false,
      showBubble: false,
      bubbleTimeout: null
    }
  },

  created() {
    // this.notificationSound = document.getElementById('notificationSound');
    // this.popupSound = document.getElementById('popupSound');
    // this.errorSound = document.getElementById('errorSound');
  },

  mounted() {
    this.notificationSound = document.getElementById('notificationSound');
    this.popupSound = document.getElementById('popupSound');
    this.errorSound = document.getElementById('errorSound');

    this.bubbleTimeout = setTimeout(() => {
      if (!this.hasUserInteracted) {
        this.showBubble = true;
        this.playPopupSound();
      }
    }, 5000);
  },

  methods: {
    closeBubble() {
      this.showBubble = false;
      this.hasUserInteracted = true;
    },

    toggleChat() {
      this.isChatOpen = !this.isChatOpen;
      this.showBubble = false; // Hide bubble when chat opens
      this.hasUserInteracted = true;
      if (this.isChatOpen && this.messages.length === 0) {
        this.messages.push({
          text: "Hi! I'm Hillary's AI assistant. Feel free to ask me anything about his experience, skills, or projects!",
          sender: 'bot'
        });
        this.playNotification();
      }
    },

    async sendMessage() {
      if (!this.userInput.trim() || this.isTyping) return;

      const userMessage = this.userInput.trim();
      this.userInput = '';
      this.messages.push({
        text: userMessage,
        sender: 'user'
      });
      this.scrollToBottom();
      this.isTyping = true;

      try {
        const response = await fetch(this.apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ message: userMessage })
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Network response was not ok');
        }

        const data = await response.json();
        this.messages.push({
          text: data.message,
          sender: 'bot'
        });
        this.playNotification();
      } catch (error) {
        console.error('Error:', error);
        this.messages.push({
          text: "I'm sorry, I'm having trouble connecting. Please try again later.",
          sender: 'bot'
        });
        this.playErrorSound();
      } finally {
        this.isTyping = false;
        this.scrollToBottom();
        this.hasUserInteracted = true;
      }
    },

    playNotification() {
      if (this.notificationSound) {
        //this.notificationSound.currentTime = 0;
        this.notificationSound.volume = 0.5;
        this.notificationSound.play().catch(err => {
          console.log('Audio playback failed:', err);
        });
      }else{
        console.error('Notification sound not found');
      }
    },
    playErrorSound(){
      if(this.errorSound){
     // this.errorSound.currentTime = 0;
      this.errorSound.play().catch(err =>{
        console.log('Error Audio playback failed:', err);
      });
    }else{
      console.error('Error sound not found');
    }
  },

    scrollToBottom() {
      this.$nextTick(() => {
        const container = this.$refs.messageContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },

    playPopupSound() {
      if (this.popupSound) {
        this.popupSound.play().catch(err => {
          console.error('Error playing popup sound:', err);
        });
      }else{
        console.error('Popup sound not found');
      }
    }
  },

  computed: {
    apiUrl() {
      return process.env.NODE_ENV === 'development' 
        ? 'http://localhost:3000/chat'
        : 'https://dp3t7qxhjj.execute-api.us-east-1.amazonaws.com/prod/chat';
      // return 'https://dp3t7qxhjj.execute-api.us-east-1.amazonaws.com/prod/chat';
    }
  },

  beforeDestroy() {
    if (this.bubbleTimeout) {
      clearTimeout(this.bubbleTimeout);
    }
  }
}
</script>

<style lang="scss">
.chat-widget {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: flex-end;

  &__toggle {
    background: #7c3aed;
    color: white;
    border: none;
    border-radius: 2rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    cursor: pointer;
    transition: all 0.3s ease;
    box-shadow: 0 4px 15px rgba(124, 58, 237, 0.3);
    animation: bounce 1s infinite;

    &:hover {
      background: #6d28d9;
      transform: translateY(-2px);
      animation-play-state: paused;
    }

    .chat-toggle-content {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .toggle-avatar {
      width: 30px;
      height: 30px;
      border-radius: 50%;
      border: 2px solid white;
      object-fit: cover;
    }

    .toggle-text {
      font-weight: 500;
    }
  }
}

.chat-window {
  position: absolute;
  bottom: calc(100% + 1rem);
  right: 0;
  width: 350px;
  height: 500px;
  background: #1a1b2e;
  border-radius: 1rem;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.3);
  border: 1px solid rgba(147, 112, 219, 0.2);

  &__header {
    background: #232442;
    padding: 1rem;
    border-bottom: 1px solid rgba(147, 112, 219, 0.2);
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }

  &__profile {
    display: flex;
    gap: 1rem;
    align-items: center;
  }

  &__avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
    border: 2px solid #7c3aed;
  }

  &__info {
    h3 {
      color: #fff;
      font-size: 1rem;
      margin: 0;
      margin-bottom: 0.25rem;
    }

    p {
      color: #9ca3af;
      font-size: 0.8rem;
      margin: 0;
    }
  }

  &__close {
    background: none;
    border: none;
    color: #9ca3af;
    cursor: pointer;
    padding: 0.5rem;
    transition: all 0.3s ease;

    &:hover {
      color: #fff;
      transform: rotate(90deg);
    }
  }

  &__messages {
    flex: 1;
    padding: 1rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1rem;

    &::-webkit-scrollbar {
      width: 6px;
    }

    &::-webkit-scrollbar-track {
      background: #1a1b2e;
    }

    &::-webkit-scrollbar-thumb {
      background: #2d1b69;
      border-radius: 3px;
    }
  }

  &__input {
    padding: 1rem;
    background: #232442;
    display: flex;
    gap: 0.5rem;
    border-top: 1px solid rgba(147, 112, 219, 0.2);

    input {
      flex: 1;
      background: #1a1b2e;
      border: 1px solid rgba(147, 112, 219, 0.2);
      padding: 0.75rem 1rem;
      border-radius: 0.5rem;
      color: #fff;
      font-size: 0.9rem;

      &:focus {
        outline: none;
        border-color: #7c3aed;
      }

      &::placeholder {
        color: #9ca3af;
      }

      &:disabled {
        opacity: 0.7;
        cursor: not-allowed;
      }
    }

    button {
      background: #7c3aed;
      color: white;
      border: none;
      border-radius: 0.5rem;
      padding: 0.75rem;
      cursor: pointer;
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: #6d28d9;
      }

      &:disabled {
        background: #4c1d95;
        cursor: not-allowed;
      }
    }
  }
}

.message {
  display: flex;
  flex-direction: column;
  max-width: 80%;

  &--user {
    align-self: flex-end;

    .message__content {
      background: #7c3aed;
      border-radius: 1rem 1rem 0 1rem;
    }
  }

  &--bot {
    align-self: flex-start;

    .message__content {
      background: #2d1b69;
      border-radius: 1rem 1rem 1rem 0;
    }
  }

  &__content {
    padding: 0.75rem 1rem;
    color: #fff;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  &__typing {
    display: flex;
    gap: 0.3rem;
    padding: 0.5rem;
    
    span {
      width: 0.5rem;
      height: 0.5rem;
      background: #9ca3af;
      border-radius: 50%;
      animation: typing 1.4s infinite;

      &:nth-child(2) { animation-delay: 0.2s; }
      &:nth-child(3) { animation-delay: 0.4s; }
    }
  }
}

.chat-bubble {
  position: absolute;
  bottom: calc(100% + 1rem);
  right: 0;
  background: white;
  padding: 1rem;
  border-radius: 1rem;
  max-width: 250px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  animation: fadeIn 0.3s ease-out;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -10px;
    right: 20px;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-top: 10px solid white;
  }

  &__content {
    color: #1a1b2e;
    font-size: 0.9rem;
    line-height: 1.4;
  }

  &__close {
    position: absolute;
    top: 0.5rem;
    right: 0.5rem;
    color: #9ca3af;
    cursor: pointer;
    font-size: 0.8rem;
    padding: 0.2rem;
    
    &:hover {
      color: #4b5563;
    }
  }
}

@keyframes typing {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-4px); }
}

@keyframes bounce {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-6px); }
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
  .chat-widget {
    bottom: 1rem;
    right: 1rem;
    
    &__toggle {
      padding: 0.4rem 0.8rem;
      font-size: 0.9rem;
      
      .toggle-avatar {
        width: 25px;
        height: 25px;
      }
    }
  }

  .chat-window {
    width: calc(100vw - 2rem);
    height: calc(100vh - 6rem);
    position: fixed;
    bottom: 5rem;
    right: 1rem;
    max-width: 350px;
  }

  .chat-bubble {
    max-width: 200px;
    font-size: 0.9rem;
    padding: 0.8rem;
  }
}
</style>