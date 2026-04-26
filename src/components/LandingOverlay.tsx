import styles from "./LandingOverlay.module.css";

type Props = {
  onExplore: () => void;
};

export function LandingOverlay({ onExplore }: Props) {
  return (
    <div className={styles.overlay}>
      <p className={styles.libraryName}>Centerville Branch Library</p>
      <h1 className={styles.tagline}>Discover My Library</h1>
      <button className={styles.exploreButton} onClick={onExplore}>
        Explore
      </button>
    </div>
  );
}
