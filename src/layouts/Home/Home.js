import gamestackTexture2Placeholder from 'assets/gamestack-list-placeholder.jpg';
import gamestackTexturePlaceholder from 'assets/gamestack-login-placeholder.jpg';
import sliceTexturePlaceholder from 'assets/slice-app-placeholder.jpg';
import sorting from 'assets/sorting.png';
import moneyManager1 from 'assets/money-manager-1.jpg'
import moneyManager2 from 'assets/money-manager-2.jpg'
import college from 'assets/college-website.png'
import { Footer } from 'components/Footer';
import { Meta } from 'components/Meta';
import { Intro } from 'layouts/Home/Intro';
import { Profile } from 'layouts/Home/Profile';
import { ProjectSummary } from 'layouts/Home/ProjectSummary';
import { useEffect, useRef, useState } from 'react';
import styles from './Home.module.css';
import transitionStyles from './SectionTransitions.module.css';

const disciplines = ['Designer', 'Prototyper', 'Automator', 'Illustrator', 'Helper'];

export const Home = () => {
  const [visibleSections, setVisibleSections] = useState([]);
  const [scrollIndicatorHidden, setScrollIndicatorHidden] = useState(false);
  const intro = useRef();
  const projectOne = useRef();
  const projectTwo = useRef();
  const projectThree = useRef();
  const details = useRef();

  useEffect(() => {
    const sections = [intro, projectOne, projectTwo, projectThree, details];

    const sectionObserver = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const section = entry.target;
            observer.unobserve(section);
            if (visibleSections.includes(section)) return;
            setVisibleSections(prevSections => [...prevSections, section]);
          }
        });
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.1 }
    );

    const indicatorObserver = new IntersectionObserver(
      ([entry]) => {
        setScrollIndicatorHidden(!entry.isIntersecting);
      },
      { rootMargin: '-100% 0px 0px 0px' }
    );

    sections.forEach(section => {
      sectionObserver.observe(section.current);
    });

    indicatorObserver.observe(intro.current);

    return () => {
      sectionObserver.disconnect();
      indicatorObserver.disconnect();
    };
  }, [visibleSections]);

  return (
    <div className={styles.home}>
      {/* Global transition elements for seamless background flow */}
      <div className={transitionStyles.transitionParticles} />
      <div className={transitionStyles.scrollFlow} />

      <Meta
        title="Developer + Designer"
        description="Design portfolio of Anmol Malviya — a product designer working on web & mobile
          apps with a focus on motion, experience design, and accessibility."
      />
      <Intro
        id="intro"
        sectionRef={intro}
        disciplines={disciplines}
        scrollIndicatorHidden={scrollIndicatorHidden}
      />
      <ProjectSummary
        id="project-1"
        sectionRef={projectOne}
        visible={visibleSections.includes(projectOne.current)}
        index={1}
        title="College Website"
        description="A comprehensive college website with modern design and functionality"
        buttonText="View website"
        buttonLink="https://gpc-itarsi-9cl7.onrender.com/"
        model={{
          type: 'laptop',
          alt: 'College website homepage',
          textures: [
            {
              srcSet: [college,],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />

      {/* Transition element between projects */}
      <div className={`${transitionStyles.transitionElement} ${transitionStyles.projectToProject}`} />

      <ProjectSummary
        id="project-2"
        alternate
        sectionRef={projectTwo}
        visible={visibleSections.includes(projectTwo.current)}
        index={2}
        title="Money Manager"
        description="A comprehensive money management app to track expenses and manage finances"
        buttonText="Download APK"
        buttonLink="/app-debug.apk"
        model={{
          type: 'phone',
          alt: 'Money Manager app screens',
          textures: [
            {
              srcSet: [moneyManager2],
              placeholder: gamestackTexturePlaceholder,
            },
            {
              srcSet: [moneyManager1,],
              placeholder: gamestackTexture2Placeholder,
            },
          ],
        }}
      />

      {/* Transition element between projects */}
      <div className={`${transitionStyles.transitionElement} ${transitionStyles.projectToProject}`} />

      <ProjectSummary
        id="project-3"
        sectionRef={projectThree}
        visible={visibleSections.includes(projectThree.current)}
        index={3}
        title="Sorting Algorithm Visualizer"
        description="Visualizing Sorting Algorithms for better understanding  "
        buttonText="View project"
        buttonLink="https://github.com/Anuj-malviya0/Sorting-Algorithm-Visualizer"
        model={{
          type: 'laptop',
          alt: 'Annotating a biomedical image in the Slice app',
          textures: [
            {
              srcSet: [sorting,],
              placeholder: sliceTexturePlaceholder,
            },
          ],
        }}
      />

      {/* Transition element to profile section */}
      <div className={`${transitionStyles.transitionElement} ${transitionStyles.projectToProfile}`} />

      <Profile
        sectionRef={details}
        visible={visibleSections.includes(details.current)}
        id="details"
      />
      <Footer />
    </div>
  );
};
