"use client";
import styles from "./Loading.module.css";

export default function SkeletonGrid({ count = 6 }) {
  return (
    <div className={styles.skeletonGrid}>
      {Array.from({ length: count }).map((_, idx) => (
        <div key={idx} className={styles.skeletonCard}>
          <div className={styles.skeletonImage}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonLineShort}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonLineFull}`}></div>
          <div className={`${styles.skeletonLine} ${styles.skeletonLineMedium}`}></div>
        </div>
      ))}
    </div>
  );
}
