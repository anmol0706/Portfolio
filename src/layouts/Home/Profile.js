import profileKatakana from 'assets/katakana-profile.svg?url';
import profileImgPlaceholder from 'assets/profile-placeholder.jpg';
import profileImg from 'assets/profile.jpg';
import { Button } from 'components/Button';
import { DecoderText } from 'components/DecoderText';
import { Divider } from 'components/Divider';
import { Heading } from 'components/Heading';
import { Image } from 'components/Image';
import { Link } from 'components/Link';
import { Section } from 'components/Section';
import { Text } from 'components/Text';
import { Transition } from 'components/Transition';
import { Fragment, useState } from 'react';
import { media } from 'utils/style';
import styles from './Profile.module.css';

const ProfileText = ({ visible, titleId }) => (
  <Fragment>
    <Heading className={styles.title} data-visible={visible} level={3} id={titleId}>
      <DecoderText text="Hi there" start={visible} delay={500} />
    </Heading>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      I’m Anmol, currently I am an Undergraduate student at {' '}
      <Link href="#">GPC</Link>. My projects include Python Automations, Machine
      Learning, and Mobile Applications . Being comfortable with code allows me to rapidly
      prototype and validate experiences. If you’re interested in the tools and software I
      use, check out my <Link href="https://github.com/anmol0706">GitHub</Link>.
    </Text>
    <Text className={styles.description} data-visible={visible} size="l" as="p">
      In my spare time I like to practice Oragami, play chess, and make Automations, I’m always down for hearing
      about new projects, so feel free to drop me a line.
    </Text>
  </Fragment>
);

export const Profile = ({ id, visible, sectionRef }) => {
  const [focused, setFocused] = useState(false);
  const titleId = `${id}-title`;

  return (
    <Section
      className={styles.profile}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      as="section"
      id={id}
      ref={sectionRef}
      aria-labelledby={titleId}
      tabIndex={-1}
    >
      <Transition in={visible || focused} timeout={0}>
        {visible => (
          <div className={styles.content}>
            <div className={styles.column}>
              <ProfileText visible={visible} titleId={titleId} />
              <div className={styles.buttonGroup}>
                <Button
                  secondary
                  className={styles.button}
                  data-visible={visible}
                  href="https://www.linkedin.com/in/anmol-malviya27"
                  icon="send"
                >
                  Connect on LinkedIn
                </Button>
                <Button
                  secondary
                  className={styles.button}
                  data-visible={visible}
                  href="https://github.com/anmol0706"
                  icon="github"
                >
                  View GitHub
                </Button>
              </div>
            </div>
            <div className={styles.column}>
              <div className={styles.tag} aria-hidden>
                <Divider
                  notchWidth="64px"
                  notchHeight="8px"
                  collapsed={!visible}
                  collapseDelay={1000}
                />
                <div className={styles.tagText} data-visible={visible}>
                  About Me
                </div>
              </div>
              <div className={styles.image}>
                <Image
                  reveal
                  delay={100}
                  placeholder={profileImgPlaceholder}
                  srcSet={[profileImg]}
                  sizes={`(max-width: ${media.mobile}px) 100vw, 480px`}
                  alt="Anmol Malviya - Developer and Designer"
                />
                {/* <svg
                  aria-hidden="true"
                  width="135"
                  height="765"
                  viewBox="0 0 135 765"
                  className={styles.svg}
                  data-visible={visible}
                >
                  <use href={`${profileKatakana}#katakana-profile`} />
                </svg> */}
              </div>
            </div>
          </div>
        )}
      </Transition>
    </Section>
  );
};
