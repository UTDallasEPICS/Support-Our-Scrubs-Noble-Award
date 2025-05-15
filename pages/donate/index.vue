<template>
  <div class="page-background">
    <Navbar />

    <div class="donate-container">
      <!-- Main donate header and description -->
      <div class="donate-header">
        <h1 class="metallic-title">Make a Donation</h1>
        <p class="header-description">
          Your donation powers the impact of the Noble Award program —
          helping fund engraved plaques for honorees, expand community outreach,
          and support day-to-day operations that keep the initiative running strong.
        </p>
      </div>

      <!-- Main content area with image and text side by side -->
      <div class="main-content fade-in">
        <!-- Left side - image -->
        <div class="image-container">
          <img
            src="https://img1.wsimg.com/isteam/ip/49b121ac-2346-4ca2-93bb-7801e38f5369/0%20(3).jpg/:/cr=t:0%25,l:0%25,w:100%25,h:100%25/rs=w:2046,h:1537"
            class="profile-image"
            alt="Noble Award Program"
          />
        </div>

        <!-- Right side - donation call to action -->
        <div class="donation-cta">
          <h2 class = "metallic-heading">Support Our Cause</h2>
          <p>
            When you donate to our parent organization Support Our Scrubs, you fuel our service projects - projects that 
            recognize healthcare heroes, promote community support, and improve healthcare communities.
          </p>
          <a href="https://paypal.me/SupportOurScrubs?locale.x=en_US" class="donate-button">
            <div class="donate-content">
              <img src="https://pngimg.com/d/paypal_PNG7.png" class="paypal-logo" />
              <span>DONATE</span>
            </div>
          </a>
          
          <p>
            Your donation supports our mission to recognize and honor those who serve with excellence, dedication, and heart.
            Funds help cover engraved plaques for honorees, expand community outreach, and support operations specific to our 
            initiative — ensuring your generosity creates real impact through our focused cause.
          </p>

        </div>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  mounted() {;
    // Set up intersection observer for fade-in elements
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Keep observing step boxes for reappearing animation when scrolling back up
          if (!entry.target.classList.contains('step-box')) {
            observer.unobserve(entry.target);
          }
        }
      });
    }, {
      threshold: 0.1, // 10% of the element must be visible
      rootMargin: '0px 0px -50px 0px' // Triggers slightly before element comes into view
    });

    // Observe all fade-in elements
    document.querySelectorAll('.fade-in').forEach((element) => {
      observer.observe(element);
    });
  }
}</script>

<style scoped>
  .metallic-title {
  font-family: 'Libre Caslon Display', serif;
  font-size: 70px;
  text-align: center;
  color: #d4af37;
  background: linear-gradient(
    120deg,
    #fff4b0 0%,
    #f0c75e 20%,
    #d4af37 40%,
    #f8e27d 60%,
    #d4af37 80%,
    #fff4b0 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.5),
    0 0 10px rgba(212, 175, 55, 0.4),
    0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
}

  @keyframes metallicShine {
    0% {
      background-position: 200% center;
    }
    100% {
      background-position: -200% center;
    }
  }


  .metallic-heading {
  font-family: 'Libre Caslon Display', serif;
  font-size: 50px;
  text-align: center;
  color: #d4af37;
  background: linear-gradient(
    120deg,
    #fff4b0 0%,
    #f0c75e 20%,
    #d4af37 40%,
    #f8e27d 60%,
    #d4af37 80%,
    #fff4b0 100%
  );
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
  position: relative;
  text-shadow:
    0 0 5px rgba(212, 175, 55, 0.5),
    0 0 10px rgba(212, 175, 55, 0.4),
    0 0 20px rgba(255, 215, 0, 0.3);
  animation: metallicShine 3s infinite linear;
}
.fade-in {
    opacity: 0;
    transform: translateY(30px);  
    transition: opacity 0.8s ease-in-out, transform 0.8s ease-out;
  }

  .fade-in.visible {
    opacity: 1;
    transform: translateY(0);  
  }

  .page-background {
    background:
    radial-gradient(circle at top, rgb(78, 78, 78), rgb(33, 33, 33) 100%);
    font-family: 'Libre Caslon Display', serif;
    min-height: 100vh;
  }

  .donate-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 40px 20px;
  }

  .donate-header {
    text-align: center;
    margin-bottom: 60px;
  }

  .donate-header h1 {
    font-size: 54px;
    font-weight: 400;
    color: #d4af37;
    margin-bottom: 20px;
    font-family: 'Libre Caslon Display', serif;
  }

  .donate-header p {
    font-size: 25px;;
    line-height: 1.6;
    color: white;
    max-width: 800px;
    margin: 0 auto;
  }

  .header-description {
    max-width: 800px;
    margin: 0 auto;
    font-size: 18px;
    line-height: 1.6;
    color: #d4af37;
  }

  .main-content {
    display: flex;
    flex-wrap: wrap;
    gap: 40px;
    align-items: stretch;
  }

  .image-container {
    flex: 1;
    min-width: 300px;
  }

  .profile-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .donation-cta {
    flex: 1;
    min-width: 300px;
    display: flex;
    flex-direction: column;
    background-color: rgb(78, 78, 78);
    padding: 40px;
    border-radius: 4px;
    color: white;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }

  .donation-cta h2 {
    font-size: 30px;
    margin-bottom: 20px;
    font-weight: 600;
  }

  .donation-cta p {
    margin-bottom: 25px;
    line-height: 1.6;
    font-size: 16px;
  }

  .donate-button {
    display: inline-block;
    background-color: #d4af37;
    color: white;
    font-weight: 600;
    text-decoration: none;
    padding: 15px 20px;
    border-radius: 5px;
    font-size: 18px;
    text-align: center;
    transition: background-color 0.3s ease;
    margin-bottom: 25px;
  }
  
  
.donate-button:hover {
  background-color: #fff5d6; /* Change to a lighter shade on hover */
  color: #d4af37;
}

.donate-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px; /* Space between image and text */
  }

.paypal-logo {
    width: 40px;
    height: 40px;
  }


  .additional-info {
    font-size: 14px;
    color: #777;
    line-height: 1.6;
  }

  /* Responsive design */
  @media (max-width: 768px) {
    .main-content {
      flex-direction: column;
    }

    .donate-header h1 {
      font-size: 42px;
    }

    .donation-cta {
      padding: 30px;
    }
  }
</style>
