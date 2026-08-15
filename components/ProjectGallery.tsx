// components/ProjectGallery.tsx
"use client";

import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Image from "next/image";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import styles from "./ProjectGallery.module.css";

interface ProjectGalleryProps {
  images: string[];
  title: string;
  locale: string;
}

export default function ProjectGallery({
  images,
  title,
  locale,
}: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const openModal = (image: string, index: number) => {
    setSelectedImage(image);
    setCurrentIndex(index);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setCurrentIndex(0);
  };

  const goToNext = () => {
    const nextIndex = (currentIndex + 1) % images.length;
    setSelectedImage(images[nextIndex]);
    setCurrentIndex(nextIndex);
  };

  const goToPrev = () => {
    const prevIndex = (currentIndex - 1 + images.length) % images.length;
    setSelectedImage(images[prevIndex]);
    setCurrentIndex(prevIndex);
  };

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") closeModal();
    if (e.key === "ArrowRight") goToNext();
    if (e.key === "ArrowLeft") goToPrev();
  };

  return (
    <>
      <section className={styles.gallerySection}>
        <h3 className={styles.galleryTitle}>
          {locale === "en" ? `${title} Screenshots` : `آلبوم تصاویر ${title}`}
        </h3>
        <div className={styles.swiperContainer}>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 30,
              },
              1280: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
            }}
            navigation
            pagination={{ clickable: true }}
            autoplay={{ delay: 4000 }}
            className={styles.projectSwiper}
          >
            {images.map((url, index) => (
              <SwiperSlide key={index} className={styles.swiperSlide}>
                <div
                  className={styles.imageWrapper}
                  onClick={() => openModal(url, index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      openModal(url, index);
                    }
                  }}
                >
                  <Image
                    src={url}
                    alt={
                      locale === "en"
                        ? `Project screenshot ${index + 1}`
                        : `عکس ${index + 1} از پروژه`
                    }
                    fill
                    className={styles.swiperImage}
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                  />
                  <div className={styles.imageOverlay}>
                    <span className={styles.zoomIcon}>🔍</span>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </section>

      {/* Modal */}
      {selectedImage && (
        <div
          className={styles.modalOverlay}
          onClick={closeModal}
          onKeyDown={handleKeyDown}
          tabIndex={-1}
        >
          <div
            className={styles.modalContent}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={styles.closeButton}
              onClick={closeModal}
              aria-label={locale === "en" ? "Close" : "بستن"}
            >
              ✕
            </button>

            <button
              className={`${styles.navButton} ${styles.prevButton}`}
              onClick={goToPrev}
              aria-label={locale === "en" ? "Previous image" : "تصویر قبلی"}
            >
              ›
            </button>

            {/* SIMPLE IMAGE CONTAINER - FIXED */}
            <div className={styles.modalImageWrapper}>
              <Image
                src={selectedImage}
                alt={
                  locale === "en"
                    ? `Project screenshot ${currentIndex + 1}`
                    : `عکس ${currentIndex + 1} از پروژه`
                }
                width={800}
                height={600}
                className={styles.modalImage}
                priority
                style={{
                  width: "auto",
                  height: "auto",
                  maxWidth: "90vw",
                  maxHeight: "90vh",
                  objectFit: "contain",
                }}
              />
            </div>

            <button
              className={`${styles.navButton} ${styles.nextButton}`}
              onClick={goToNext}
              aria-label={locale === "en" ? "Next image" : "تصویر بعدی"}
            >
              ‹
            </button>

            <div className={styles.imageCounter}>
              {currentIndex + 1} / {images.length}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
