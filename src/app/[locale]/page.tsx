/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/[locale]/page.tsx
"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion, easeOut } from "framer-motion";
import { FaGithub, FaTelegram } from "react-icons/fa";
import { BiLogoGmail } from "react-icons/bi";
import LanguageSwitcher from "./langswitcher";
import Image from "next/image";
import { FaSquareInstagram } from "react-icons/fa6";
import styles from "./home.module.css";
import ProjectGallery from "@/components/ProjectGallery";
import { allProjectImages } from "@/const/images";

export default function HomePage() {
  const t = useTranslations("Portfolio");
  const locale = useLocale();

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: easeOut } },
  };

  const itemVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.4 } },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  return (
    <div className={styles.main}>
      {/* Header Section */}
      <header className={styles.header}>
        <div className={styles.container}>
          <motion.div
            className={styles.headerContent}
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className={styles.headerText}>
              <motion.h1
                className={styles.h1}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                {t("name")}
              </motion.h1>
              <motion.p
                dir={locale === "fa" ? "rtl" : "ltr"}
                className={styles.intro}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                {t("intro")}
              </motion.p>
              <motion.div
                className={styles.taglineWrapper}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <p className={styles.tagline}>
                  {locale === "en"
                    ? "Crafting seamless digital experiences with a passion for innovation and precision."
                    : "ایجاد تجربه‌های دیجیتال بی‌نقص با اشتیاق به نوآوری و دقت."}
                </p>
              </motion.div>
            </div>
            <motion.div
              className={styles.imageContainer}
              initial={{ opacity: 0, scale: 0.5, rotate: -10 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: 2 }}
            >
              <Image
                src="/ali.jpg"
                alt="Ali Sabet"
                width={220}
                height={220}
                className={styles.profileImage}
                priority
              />
            </motion.div>
          </motion.div>
          <div className={styles.languageWrapper}>
            <LanguageSwitcher current={locale} />
          </div>
        </div>
        <div className={styles.headerDecoration}>
          <div className={styles.decorationCircle2}></div>
        </div>
      </header>

      {/* About Me Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.h2
            className={styles.h2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {locale === "en" ? "About Me" : "درباره من"}
          </motion.h2>
          <motion.div
            className={styles.aboutContent}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {locale === "en" && (
              <>
                <p className={styles.paragraph}>
                  I&lsquo;m a dedicated Full-Stack Developer with over 5 years
                  of experience crafting innovative and scalable web
                  applications. My expertise lies in modern JavaScript
                  frameworks, backend technologies, and creating intuitive user
                  experiences that leave a lasting impact.
                </p>
                <p className={styles.paragraph}>
                  When I&lsquo;m not coding, you can find me exploring new
                  technologies, contributing to open-source projects, solving
                  unsolvable puzzles, reading a good murder-mystery book or
                  enjoying a refreshing hike in nature.
                </p>
              </>
            )}
            {locale === "fa" && (
              <>
                <p className={styles.paragraph}>
                  من یک توسعه‌دهنده فول‌استک با بیش از سه سال تجربه در ساخت
                  برنامه‌های وب و اپلیکیشن اندرویدِ حرفه‌ای و نوآورانه هستم.
                  تخصص من در فریم‌ورکهای مدرن جاوااسکریپت، فناوری‌های بک‌اند و
                  ایجاد تجربه‌های کاربری بصری است که تأثیر ماندگاری دارند.
                </p>
                <p className={styles.paragraph}>
                  وقتی کد نمی‌نویسم، مشغول مطالعه فناوری‌های جدید، مشارکت در
                  پروژه‌های متن‌باز، لذت بردن از حل کردن یک پازل پیچیده یا
                  خواندن یک کتاب جنایی هستم. (اگه شما هم آگاتا کریستی رو خیلی
                  دوست دارین رفیق من هستین)
                </p>
              </>
            )}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section className={styles.skillsSection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.skillsTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {t("skills.title")}
          </motion.h2>
          <motion.div
            className={styles.skillsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {t.raw("skills.list").map((skill: string, index: number) => (
              <motion.div
                key={index}
                className={`${styles.skillCard} ${
                  styles[`skillColor${index % 4}`]
                }`}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className={styles.skillText}>{skill}</span>
                <div className={styles.skillGlow}></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.h2
            className={styles.h2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {t("projects.title")}
          </motion.h2>
          <motion.div
            className={styles.projectsGrid}
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {t.raw("projects.list").map((project: any, index: number) => (
              <motion.div
                key={index}
                className={styles.projectCard}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className={styles.projectHeader}>
                  <h3 className={styles.h3}>{project.name}</h3>
                  <div className={styles.projectNumber}>#{index + 1}</div>
                </div>
                <p className={styles.projectDescription}>
                  {project.description}
                </p>

                <div className={styles.projectMeta}>
                  <span className={styles.metaLabel}>
                    {locale === "en" ? "Technologies:" : "فناوری‌ها:"}
                  </span>
                  <span className={styles.metaValue}>
                    {project.name === "Danai-e" || project.name === "دانای-ای"
                      ? "React Native, Expo, Next.js, Express.js, AI"
                      : project.name === "Kalario" || project.name === "کالاریو"
                        ? "React Native, Expo, Next.js, Express.js, MySQL"
                        : project.name === "Baremi" || project.name === "بارمی"
                          ? "React Native, Expo, JavaScript"
                          : project.name === "Gilly Cooking App" ||
                              project.name === "اپ آشپزی گیلی"
                            ? "React Native, AI, Firebase"
                            : "Next.js, Prisma, MySQL, React, Tailwind"}
                  </span>
                </div>

                <div className={styles.projectMeta}>
                  <span className={styles.metaLabel}>
                    {locale === "en" ? "Impact:" : "تأثیر:"}
                  </span>
                  <span className={styles.metaValue}>
                    {project.name === "Danai-e" || project.name === "دانای-ای"
                      ? locale === "en"
                        ? "AI-powered quiz & visual learning"
                        : "آزمون و یادگیری بصری با AI"
                      : project.name === "Kalario" || project.name === "کالاریو"
                        ? locale === "en"
                          ? "E-commerce with real-time messaging"
                          : "فروشگاهی با پیام‌رسانی"
                        : project.name === "Baremi" || project.name === "بارمی"
                          ? locale === "en"
                            ? "Open-source educator tool"
                            : "ابزار متن‌باز آموزشی"
                          : project.name === "Gilly Cooking App" ||
                              project.name === "اپ آشپزی گیلی"
                            ? locale === "en"
                              ? "AI cooking assistant"
                              : "دستیار آشپزی AI"
                            : locale === "en"
                              ? index === 0
                                ? "50+ local businesses engaged"
                                : "30% sales increase"
                              : index === 0
                                ? "افزایش فروش کسب‌وکارها"
                                : "افزایش ۳۰٪ فروش"}
                  </span>
                </div>

                <div className={styles.projectLinkWrapper}>
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.projectLink}
                  >
                    {locale === "en" ? "View Project →" : "مشاهده پروژه ←"}
                    <span className={styles.linkArrow}>→</span>
                  </a>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Photo Gallery Section */}
      <section className={styles.section}>
        <div className={styles.container}>
          <motion.h2
            className={styles.h2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {locale === "en" ? "Project Gallery" : "آلبوم تصاویر پروژه‌ها"}
          </motion.h2>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            <ProjectGallery
              images={allProjectImages}
              title={locale === "en" ? "All Projects" : "همه پروژه‌ها"}
              locale={locale}
            />
          </motion.div>
        </div>
      </section>

      {/* Contact Section */}
      <section className={styles.contactSection}>
        <div className={styles.container}>
          <motion.h2
            className={styles.contactTitle}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            variants={containerVariants}
          >
            {t("contact.title")}
          </motion.h2>
          <motion.p
            className={styles.contactSubtitle}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {locale === "en"
              ? "Interested in collaborating or have a project in mind? Let's connect and bring your ideas to life!"
              : "علاقه‌مند به همکاری هستید یا ایده‌ای برای پروژه دارید؟ خوشحال میشم با من ارتباط برقرار کنید و ایده‌هامون رو به واقعیت تبدیل کنیم!"}
          </motion.p>
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
            className={styles.contactLinks}
          >
            <div className={styles.socialLinks}>
              <motion.a
                href="https://instagram.com/ali.ssabet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className={styles.socialLink}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaSquareInstagram className={styles.socialIconInstagram} />
                <span>Instagram</span>
              </motion.a>
              <motion.a
                href="mailto:ali.ssabet1995@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Email"
                className={styles.socialLink}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <BiLogoGmail className={styles.socialIconGmail} />
                <span>Gmail</span>
              </motion.a>
              <motion.a
                href="https://github.com/alisabet95"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub"
                className={styles.socialLink}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaGithub className={styles.socialIconGithub} />
                <span>GitHub</span>
              </motion.a>
              <motion.a
                href="https://t.me/ali_ssabet"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Telegram"
                className={styles.socialLink}
                variants={itemVariants}
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <FaTelegram className={styles.socialIconTelegram} />
                <span>Telegram</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className={styles.footer}>
        <div className={styles.container}>
          <motion.p
            className={styles.footerText}
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            © 2025 Ali Sabet |{" "}
            <a
              href="https://todo-album.vercel.app"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Natoure rasht"
              className={styles.footerHighlight}
            >
              {t("footer")}
            </a>
          </motion.p>
        </div>
      </footer>
    </div>
  );
}
