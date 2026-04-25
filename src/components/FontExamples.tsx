import styles from "./FontExamples.module.css";

const FONTS: { name: string; fontClass: string }[] = [
  { name: "Libre Baskerville", fontClass: styles.fontLibreBaskerville },
  { name: "Lora", fontClass: styles.fontLora },
  { name: "Inter", fontClass: styles.fontInter },
  { name: "Roboto", fontClass: styles.fontRoboto },
  { name: "Open Sans", fontClass: styles.fontOpenSans },
  { name: "Lato", fontClass: styles.fontLato },
  { name: "JetBrains Mono", fontClass: styles.fontJetbrainsMono },
  { name: "Fira Code", fontClass: styles.fontFiraCode },
];

export default function FontExamples() {
  return (
    <div className={styles.wrapper}>
      <h3>Font Examples</h3>
      {FONTS.map(({ name, fontClass }) => (
        <p key={name} className={fontClass}>
          Hello World! from {name}
        </p>
      ))}
    </div>
  );
}
