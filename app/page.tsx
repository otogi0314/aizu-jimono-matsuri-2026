"use client";

import MenuHeader from "./MenuHeader";
import { useEffect, useRef, useState } from "react";

const recruitments = [
  {
    icon: "食",
    title: "飲食・キッチンカー",
    text: "会津の食材や郷土の味で、来場者のおなかと心を満たしてくれる飲食出店者を募集します。",
    url: "https://docs.google.com/forms/d/1os86tNC-kJYLIoJhj8K690wkYRRrjsUHnxgteK5wEk4/viewform?edit_requested=true",
  },
  {
    icon: "験",
    title: "体験ブース",
    text: "農業・伝統工芸・ITなど、会津ならではの学びと発見を子どもたちに届ける体験を募集します。",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSeqKWAYaiJVvFIMwxBY4aSarwaoPFub1U3Eo91RGUOZmKlO0g/viewform",
  },
  {
    icon: "結",
    title: "協賛企業",
    text: "地域の次世代と会津のこれからを、この祭りと一緒に応援してくださる企業・団体を募集します。",
    url: "https://docs.google.com/forms/d/e/1FAIpQLSe2OgKyZluojOgZegKRzcHt72pfnzLuLBmiyURn2BpMVU1KCg/viewform",
  },
];

const experiences = [
  { num: "壱", title: "知る・つくる", text: "プログラミングやデザイン、AIなど、会津の新しい仕事と技術を楽しく体験。" },
  { num: "弐", title: "食べる・ふれる", text: "会津の食や農業、伝統工芸を、作り手との交流や体験を通して知る。" },
  { num: "参", title: "踊る・体感する", text: "会津の祭りやリズムを身体で感じる体験を通して、踊って楽しむ一日を。" },
];

const sponsors = [
  { name: "SanYoshi", logo: "/sanyoshi.png", url: "https://www.owanya.com/", tier: 3 },
  { name: "第一緑化工業株式会社", logo: "", url: "", tier: 1 },
];

const instagramProfileUrl = "https://www.instagram.com/aizu_base/";
const instagramPosts = [
  { url: "https://www.instagram.com/p/DbcyhTuRtcN/", caption: "会津じものまつりの最新情報" },
  { url: "https://www.instagram.com/p/Dbu03U_xfuu/", caption: "準備の様子を発信中" },
  { url: "https://www.instagram.com/p/DbsPKw7RL4O/", caption: "会津の魅力をお届けします" },
];

export default function Home() {
  const [igIndex, setIgIndex] = useState(0);
  const [shouldSponsorMarquee, setShouldSponsorMarquee] = useState(false);
  const sponsorRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const timer = window.setInterval(() => setIgIndex((index) => (index + 1) % instagramPosts.length), 3500);
    return () => window.clearInterval(timer);
  }, []);

  const logoSponsors = sponsors.filter((sponsor) => sponsor.logo);
  const textSponsors = sponsors.filter((sponsor) => !sponsor.logo);

  useEffect(() => {
    const element = sponsorRef.current;
    if (!element) return;

    const updateMarquee = () => setShouldSponsorMarquee(element.scrollWidth > element.clientWidth + 1);
    updateMarquee();
    const observer = new ResizeObserver(updateMarquee);
    observer.observe(element);
    return () => observer.disconnect();
  }, [logoSponsors.length]);

  const marqueeSponsors = shouldSponsorMarquee ? [...logoSponsors, ...logoSponsors] : logoSponsors;

  return (
    <main>
      <MenuHeader />

      <section className="hero" id="top">
        <div className="poster-wrap">
          <img className="hero-image" src="/aizu-jimono-poster.png" alt="2026 会津じものまつりのチラシ" />
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-reveal hero-reveal-1">AIZU JIMONO MATSURI 2026</p>
          <h1>
            <span className="hero-reveal hero-reveal-2 hero-line-first">知って、食べて、踊って、</span>
            <span className="hero-reveal hero-reveal-3">会津の「今」と</span>
            <span className="hero-reveal hero-reveal-4">「これから」を、</span>
            <span className="hero-reveal hero-reveal-5">ともにつくる一日。</span>
          </h1>
          <div className="hero-tags hero-reveal hero-reveal-6" aria-label="イベントの内容">
            <span>体験</span><span>飲食</span><span>ステージ</span>
          </div>
          <div className="hero-facts">
            <p><strong>2026.11.8 <em>SUN</em></strong><span>10:00—16:00</span></p>
            <p><strong>北出丸通り・スマートシティAiCT</strong><span>入場無料　※一部ブースは有料です</span></p>
          </div>
          <a className="primary-button" href="#recruit">募集はこちら！ <span aria-hidden="true">↓</span></a>
        </div>
        <div className="hero-ribbon">出店・出展・協賛　募集中！</div>
      </section>

      <section className="message section" id="about">
        <div className="message-content">
          <div className="message-title">
            <p className="eyebrow">ABOUT</p>
            <h2>会津を知る。<br />会津と出会う。</h2>
          </div>
          <div className="message-copy">
            <p>会津じものまつりは、会津の伝統と最新のデジタルが出会う体験型イベントです。</p>
            <p>この祭りで私たちが目指す3つのこと：</p>
            <ul>
              <li><strong>会津の魅力を体験する：</strong>食・伝統・文化をデジタルと組み合わせ、深い発見を届けます。</li>
              <li><strong>若者が主役の祭り：</strong>学生が企画・発信し、地域が応援したくなる場をつくります。</li>
              <li><strong>子どもが学ぶ場：</strong>農業・工芸・ITに触れ、会津のルーツを体験で学べる機会を提供します。</li>
            </ul>
            <p>会津の「今」を楽しみ、みんなで「これから」をつくる祭りです。</p>
          </div>
        </div>
        <div className="instagram">
          <div className="instagram-slides">
            {instagramPosts.map((post, index) => (
              <div key={post.url} className={`instagram-slide${index === igIndex ? " active" : ""}`}>
                <a href={post.url} target="_blank" rel="noreferrer">
                  <img src={`/instagram-${index + 1}.png`} alt={post.caption} />
                </a>
                <div className="instagram-caption">{post.caption}</div>
              </div>
            ))}
          </div>
          <div className="instagram-dots">
            {instagramPosts.map((_, index) => (
              <button key={index} className={index === igIndex ? "dot active" : "dot"} onClick={() => setIgIndex(index)} aria-label={`${index + 1}枚目を表示`} />
            ))}
          </div>
          <p className="instagram-intro">Instagramで準備の様子を発信中！</p>
          <a className="instagram-cta" href={instagramProfileUrl} target="_blank" rel="noreferrer">公式Instagramを見る</a>
        </div>
      </section>

      <section className="experience section" id="experience">
        <p className="eyebrow">祭りを彩る3つのコンセプト</p>
        <h2><span className="know">知る・つくる</span><br /><span className="eat">食べる・ふれる</span><br /><span className="dance">踊る・体感する</span></h2>
        <div className="experience-grid">
          {experiences.map((item) => (
            <article key={item.num}><span>{item.num}</span><h3>{item.title}</h3><p>{item.text}</p></article>
          ))}
        </div>
      </section>

      <section className="stamp section" id="sticker-rally">
        <p className="eyebrow">SEAL RALLY</p>
        <div className="seal-rally-visual" aria-hidden="true"><span>体験</span><span>飲食</span><span>挑戦</span></div>
        <h2>会場をめぐって、<br />シールを集めよう！</h2>
        <div className="stamp-copy">
          <p>体験ブースや飲食ブースを楽しんだら、会場だけのオリジナルシールをゲット。</p>
          <p>シールを3枚集めると、ガラポンにチャレンジできます。いろいろなブースをめぐって、会津の魅力をたっぷり味わおう！</p>
        </div>
      </section>

      <section className="recruit section" id="recruit">
        <div className="section-heading">
          <p className="eyebrow">JOIN THE FESTIVAL</p>
          <h2><span className="recruit-heading-line">一緒につくる人、</span><span>募集中です。</span></h2>
          <div className="recruit-intro">
            <p>会津の魅力を届ける仲間を募集しています。</p>
            <p>食で人を笑顔にしたい方、得意なことを子どもたちに伝えたい方、地域の未来を応援したい企業・団体の皆さま。この祭りだから生まれる出会いを、私たちと一緒につくりませんか。</p>
            <p>気になる募集カードをクリックして、詳しい内容をご覧ください。</p>
          </div>
        </div>
        <div className="recruit-grid">
          {recruitments.map((item, index) => (
            <a className="recruit-card" key={item.title} href={item.url} target={item.url.startsWith("http") ? "_blank" : undefined} rel={item.url.startsWith("http") ? "noreferrer" : undefined}>
              <div className="card-top"><span className="seal">{item.icon}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="status"><i /> 募集中！</div>
              <span className="recruit-link">募集要項・応募フォーム <b aria-hidden="true">→</b></span>
            </a>
          ))}
        </div>
      </section>

      <section className="sponsors section" id="sponsors">
        <div className="section-heading"><p className="eyebrow">SPONSORS</p><h2>協賛企業</h2></div>
        <div className="sponsor-tiers">
          <div className="sponsor-marquee" ref={sponsorRef}>
            <div className={`sponsor-marquee-track${shouldSponsorMarquee ? " is-active" : ""}`}>
              {marqueeSponsors.map((sponsor, index) => (
                <a className="sponsor-marquee-item" key={`${sponsor.name}-${index}`} href={sponsor.url} target="_blank" rel="noreferrer">
                  <img src={sponsor.logo} alt={`${sponsor.name} ロゴ`} />
                  <span>{sponsor.name}</span>
                </a>
              ))}
            </div>
          </div>
          <ul className="sponsor-name-list">
            {textSponsors.map((sponsor) => <li key={sponsor.name}>{sponsor.name}</li>)}
          </ul>
        </div>
      </section>

      <section className="access section" id="access">
        <div><p className="eyebrow">EVENT INFORMATION</p><h2>開催情報</h2></div>
        <dl>
          <div><dt>日時</dt><dd><strong>2026年11月8日（日）</strong><br />10:00〜16:00</dd></div>
          <div><dt>会場</dt><dd><strong>スマートシティAiCT・北出丸通り</strong><br />福島県会津若松市東栄町1-77</dd></div>
          <div><dt>入場料</dt><dd><strong>無料</strong><br />※一部の体験・飲食・物販は有料です。</dd></div>
          <div><dt>雨天時</dt><dd>開催方針は決まり次第お知らせします。</dd></div>
        </dl>
        <a href="https://maps.google.com/?q=スマートシティAiCT" target="_blank" rel="noreferrer">Googleマップで見る ↗</a>
      </section>

      <section className="coming section" id="news">
        <p className="eyebrow">COMING SOON</p><h2>出店者・プログラムは<br />近日公開。</h2><p>最新のお知らせ、よくある質問なども順次掲載します。</p>
      </section>

      <footer>
        <div className="footer-main">
          <div><div className="footer-logo"><span>会津</span><strong>じものまつり</strong></div><p>知って、食べて、踊って。会津の「今」と「これから」を、ともにつくる</p></div>
          <a className="footer-instagram" href={instagramProfileUrl} target="_blank" rel="noreferrer" aria-label="会津じものまつり公式Instagram">
            <span aria-hidden="true">◎</span><div><small>FOLLOW US</small><strong>Instagram</strong></div>
          </a>
        </div>
        <div className="footer-bottom"><span>主催：会津じものまつり実行委員会</span><span>© 2026 AIZU JIMONO MATSURI</span></div>
      </footer>
    </main>
  );
}
