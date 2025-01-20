<template>
    <section id="blog" class="dark-section">
      <div class="container-fluid">
        <h1 class="section-header">{{ heading }}</h1>
  
       <!-- Update this part in the template -->
<article class="blog-post">
  <div class="blog-header">
    <h2>Building a Custom AI Assistant with OpenAI and AWS</h2>
    <div class="post-meta">
      <span><i class="fas fa-calendar"></i> January 2024</span>
      <span><i class="fas fa-tag"></i> AI Integration</span>
    </div>
  </div>

  <!-- Demo Image -->
  <div class="demo-image">
    <img src="../../assets/images/blog/chatbot-demo.jpeg" alt="AI Chat Assistant Demo" />
    <p class="image-caption">Custom AI Assistant integrated with my portfolio</p>
  </div>

  <!-- Introduction -->
  <div class="blog-section">
    <h3>Introduction</h3>
    <p>As part of enhancing my portfolio with AI capabilities, I developed a custom chatbot using OpenAI's GPT model. This integration allows visitors to interactively learn about my experience, skills, and projects through natural conversation. The assistant is built with Vue.js for the frontend and uses AWS Lambda for secure API handling.</p>
  </div>

  <!-- Prerequisites -->
  <div class="blog-section">
    <h3>Prerequisites</h3>
    <ul class="tech-list">
      <li><strong>OpenAI Account:</strong> Active account with API access and billing setup</li>
      <li><strong>AWS Account:</strong> For Lambda and API Gateway</li>
      <li><strong>Development:</strong> Node.js, Vue.js basics</li>
      <li><strong>Tools:</strong> VS Code, Git, npm/yarn</li>
    </ul>
  </div>

  <!-- Architecture Overview -->
  <div class="blog-section">
    <h3>System Architecture</h3>
    <p>The chatbot implementation follows a serverless architecture:</p>
    <div class="implementation-steps">
      <div class="step">
        <div class="step-number">1</div>
        <div class="step-content">
          <h4>Frontend (Vue.js)</h4>
          <p>Custom chat interface with real-time interactions, animations, and message handling.</p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">2</div>
        <div class="step-content">
          <h4>API Layer (AWS)</h4>
          <p>API Gateway endpoint connected to Lambda function for secure message processing.</p>
        </div>
      </div>

      <div class="step">
        <div class="step-number">3</div>
        <div class="step-content">
          <h4>AI Integration (OpenAI)</h4>
          <p>GPT-3.5 Turbo model with custom system prompts for contextual responses.</p>
        </div>
      </div>
    </div>
  </div>

  <!-- Frontend Implementation -->
  <div class="blog-section">
    <h3>Frontend Implementation</h3>
    <p>The chat interface is built as a Vue component with these key features:</p>
    <div class="code-block">
      <h4>ChatBot.vue Structure</h4>
      <pre><code class="language-javascript">
// Key component features
{
  name: 'ChatBot',
  data() {
    return {
      isChatOpen: false,
      messages: [],
      userInput: '',
      isTyping: false,
      notificationSound: null
    }
  },
  methods: {
    toggleChat() {
      // Chat window toggle logic
    },
    async sendMessage() {
      // Message handling and API calls
    },
    playNotification() {
      // Sound effects for messages
    }
  }
}
      </code></pre>
    </div>
  </div>

  <!-- Backend Setup -->
  <div class="blog-section">
    <h3>AWS Lambda Configuration</h3>
    <p>The Lambda function handles OpenAI API calls and message processing:</p>
    <div class="code-block">
      <h4>Lambda Function</h4>
      <pre><code class="language-javascript">
const OpenAI = require('openai');

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

exports.handler = async (event) => {
    try {
        const { message } = JSON.parse(event.body);
        
        const completion = await openai.chat.completions.create({
            model: "gpt-3.5-turbo",
            messages: [
                // System message defining assistant behavior
                {
                    role: "system",
                    content: "You are Hillary's portfolio AI assistant..."
                },
                { role: "user", content: message }
            ]
        });

        return {
            statusCode: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            },
            body: JSON.stringify({
                message: completion.choices[0].message.content
            })
        };
    } catch (error) {
        // Error handling
    }
};
      </code></pre>
    </div>
  </div>

  <!-- Challenges & Solutions -->
  <div class="blog-section">
    <h3>Implementation Challenges</h3>
    <div class="challenges">
      <div class="challenge-item">
        <h4>1. Message Context</h4>
        <p>Challenge: Maintaining conversation context for natural responses.</p>
        <p>Solution: Implemented custom system prompts with detailed portfolio information.</p>
      </div>
      <div class="challenge-item">
        <h4>2. API Security</h4>
        <p>Challenge: Securing OpenAI API key and handling requests.</p>
        <p>Solution: Used AWS Lambda to keep credentials secure and handle API calls server-side.</p>
      </div>
      <div class="challenge-item">
        <h4>3. User Experience</h4>
        <p>Challenge: Creating smooth, responsive chat interactions.</p>
        <p>Solution: Added typing indicators, animations, and sound effects.</p>
      </div>
    </div>
  </div>

  <!-- Testing & Deployment -->
  <div class="blog-section">
    <h3>Testing & Deployment</h3>
    <p>The implementation includes local testing setup and production deployment steps:</p>
    <ul class="tech-list">
      <li><strong>Local Testing:</strong> Express server for development</li>
      <li><strong>AWS Deployment:</strong> Lambda function and API Gateway setup</li>
      <li><strong>Frontend Integration:</strong> Environment-based API endpoints</li>
      <li><strong>Monitoring:</strong> CloudWatch logs for error tracking</li>
    </ul>
  </div>
</article>
      </div>
      <Arrow />
    </section>
  </template>
  
  <script>
  import data from "../../data/data.json";
  import Arrow from "../components/Arrow.vue";
  
  export default {
    name: "Blog",
    components: {
      Arrow,
    },
    data() {
      return {
        heading: data.main.headings.Blog,
      };
    },
  };
  </script>

<style lang="scss">
#blog {
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
    color: #f5f1f7;
    text-transform: uppercase;
    text-align: center;
    margin-bottom: rem;
    font-weight: 600;
    letter-spacing: 1px;
    position: relative;
    text-decoration: None;
    
    &::after {
      content: '';
      position: absolute;
      bottom: 30px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 3px;
      background-color: #ed2024;
    }
  }

  .blog-post {
    background-color: #1a1b2e;
    border-radius: 1rem;
    padding: 2rem;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    
    .blog-header {
      text-align: center;
      margin-bottom: 3rem;

      h2 {
        color: #fff;
        font-size: 2rem;
        margin-bottom: 1rem;
      }

      .post-meta {
        color: #9ca3af;
        font-size: 0.9rem;
        
        span {
          margin: 0 1rem;
          
          i {
            margin-right: 0.5rem;
          }
        }
      }
    }

    .demo-image {
      margin: 2rem 0;
      
      img {
        width: 100%;
        border-radius: 0.5rem;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
      }

      .image-caption {
        text-align: center;
        color: #9ca3af;
        font-size: 0.9rem;
        margin-top: 1rem;
      }
    }

    .blog-section {
      margin: 3rem 0;

      h3 {
        color: #ddd6fe;
        font-size: 1.5rem;
        margin-bottom: 1.5rem;
        border-bottom: 2px solid rgba(147, 112, 219, 0.2);
        padding-bottom: 0.5rem;
      }

      p {
        color: #e2e8f0;
        line-height: 1.8;
        margin-bottom: 1rem;
      }
    }

    .implementation-steps {
      .step {
        display: flex;
        gap: 1.5rem;
        margin-bottom: 2rem;

        .step-number {
          width: 2.5rem;
          height: 2.5rem;
          background: #ed2024;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #fff;
          font-weight: bold;
          flex-shrink: 0;
        }

        .step-content {
          h4 {
            color: #ddd6fe;
            font-size: 1.2rem;
            margin-bottom: 0.5rem;
          }

          p {
            color: #e2e8f0;
          }
        }
      }
    }

    .code-block {
      background: #13141f;
      border-radius: 0.5rem;
      padding: 1.5rem;
      margin: 1.5rem 0;

      h4 {
        color: #ddd6fe;
        margin-bottom: 1rem;
      }

      pre {
        margin: 0;
        padding: 1rem;
        background: #0d0e1a;
        border-radius: 0.5rem;
        overflow-x: auto;

        code {
          color: #e2e8f0;
          font-family: 'Fira Code', monospace;
          font-size: 0.9rem;
          line-height: 1.6;
        }
      }
    }

    .tech-list {
      list-style: none;
      padding: 0;

      li {
        color: #e2e8f0;
        margin-bottom: 1rem;
        padding-left: 1.5rem;
        position: relative;

        &::before {
          content: '→';
          position: absolute;
          left: 0;
          color: #ed2024;
        }

        strong {
          color: #ddd6fe;
          margin-right: 0.5rem;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .container-fluid {
      width: 95%;
      padding: 1rem;
    }

    .blog-post {
      padding: 1.5rem;

      .blog-header {
        h2 {
          font-size: 1.5rem;
        }
      }

      .implementation-steps {
        .step {
          flex-direction: column;
          gap: 1rem;

          .step-number {
            width: 2rem;
            height: 2rem;
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>