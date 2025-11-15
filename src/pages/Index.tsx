import { Hero } from '@/components/Hero';
import { Section } from '@/components/Section';
import { PublicationCard } from '@/components/PublicationCard';
import { ExperienceCard } from '@/components/ExperienceCard';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-12 md:py-16">
        <Hero
          name="Pranav Karra"
          title="CS @ Penn State, MTS @ Truvo"
          description="i'm a third year penn state cs major interested in ai interpretability and alignment research. i'm currently a full stack engineer at truvo insure, where i am building intelligent insurance agents. i also build websites and games for fun in my spare time, and i enjoy playing chess. i am the president of ml@psu, and i also help build vision systems for battle bots. i'm currently working under Dr. Rui Zhang in the penn state nlp lab and collaborating with Dr. Lee Dongwon."
          imageUrl="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces"
        />

        <Section title="Publications">
          <PublicationCard
            title="MoE Lens - An Expert Is All You Need"
            authors="Marmik Chaudhari, Idhant Gulati, Nishkal Hundia, Pranav Karra, Shivam Raval"
            date="March 5, 2025"
            description="We study expert specialization in DeepSeekMoE and find that a few specialized experts can effectively approximate the full model's performance, indicating potential for inference improvements."
            link="https://openreview.net/forum?id=GS4WXncwSF"
          />
        </Section>

        <Section title="Experience">
          <ExperienceCard
            title="Full Stack Engineer"
            company="Truvo Insure"
            location="San Francisco, CA"
            period="present"
            description={[
              "Built an AI chatbot system that can search through thousands of insurance documents and client data using RAG technology",
              "Set up the complete pipeline from Firebase to Chroma vector database",
              "Enabled users to chat with the system to find specific client information and documents",
              "Developed full-stack solution integrating document processing, vector search, and conversational AI"
            ]}
            link="https://truvoinsure.com/"
          />

          <ExperienceCard
            title="Researcher"
            company="PSU NLP Lab"
            location="State College, PA"
            period="jan 2025 - present"
            description={[
              "Developing LLM-based gene set function discovery system using RAG to predict biological functions from gene lists and recent literature",
              "Only undergraduate researcher on the team, working under Dr. Rui Zhang on automated database construction for bioinformatics applications"
            ]}
          />

          <ExperienceCard
            title="President"
            company="Machine Learning @ Penn State"
            location="State College, PA"
            period="sep 2024 - present"
            description={[
              "Founded and serve as President of ML@PSU, managing 120 active members",
              "Curated 500+ machine learning resources for club members",
              "Spearhead speaker series featuring PhD students, professors, and industry professionals"
            ]}
            link="https://www.mlpsu.org/"
          />

          <ExperienceCard
            title="Computer Vision Team Lead"
            company="Penn State Robo X"
            location="State College, PA"
            period="sep 2024 - dec 2024"
            description={[
              "Lead a 12-member team, ranked #8 in North America among 25 universities in DJI Robomaster Championships",
              "Developing autonomous navigation system integrating LiDAR-based SLAM with ROS",
              "Built multi-object tracking systems using Kalman filters and traditional CV techniques",
              "Created real-time scoring system using OpenCV"
            ]}
            link="https://sites.psu.edu/robox/"
          />

          <ExperienceCard
            title="Captain"
            company="ACM MLPSU"
            location="State College, PA"
            period="sep 2024 - dec 2024"
            description={[
              "Lead weekly machine learning workshops for 20 recurring students",
              "Cover topics including regression techniques and clustering analysis",
              "Create interactive presentations using Reveal.js and Quarto"
            ]}
            link="https://acm.psu.edu/"
          />

          <ExperienceCard
            title="E-Sports Attendant"
            company="Penn State Campus Recreation"
            location="State College, PA"
            period="dec 2023 - present"
            description={[
              "Diagnose and resolve hardware/software issues across 50+ PCs and consoles",
              "Manage inventory of PC parts, consoles, games, and peripherals",
              "Assist in hiring and training new esports attendants"
            ]}
          />

          <ExperienceCard
            title="Machine Learning Intern"
            company="Manipal Institute of Technology"
            location="Manipal, Karnataka, India"
            period="jul 2024 - aug 2024"
            description={[
              "Contributed to CVD detection project using CT scans",
              "Developed optimized HOG3D algorithm reducing processing time by 75%",
              "Built 3D CNN classifier for enhanced CVD detection",
              "Worked with NumPy, SimpleITK, Plotly, and other ML tools"
            ]}
            link="https://www.manipal.edu/mit.html"
          />
        </Section>
      </div>
    </div>
  );
};

export default Index;
