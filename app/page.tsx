"use client";

import MenuHeader from "./MenuHeader";
import { useEffect, useRef, useState, type ReactNode } from "react";

const recruitments = [
  {
    icon: "食",
    title: "飲食・キッチンカー",
    text: "会津の食材や郷土の味で、来場者のおなかと心を満たしてくれる飲食出店者を募集します。",
    url: "https://docs.google.com/forms/d/1os86tNC-kJYLIoJhj8K690wkYRRrjsUHnxgteK5wEk4/viewform?edit_requested=true",
    closed: true,
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

// 協賛区分: "top"=最上位の別枠（ラベルなし） / "special"=スペシャルスポンサー（別枠） / 10=10万円（ロゴ+URL） / 5=5万円（ロゴ） / 1=1万円（社名のみ）
// スペシャルスポンサーを増やす場合は tier: "special" の行を追加するだけです。
// ロゴ未入稿の企業は logo を "" にすると社名のみで表示されます。
type Sponsor = { name: string; logo: string; url: string; tier: "top" | "special" | 10 | 5 | 1 };

const sponsors: Sponsor[] = [
  { name: "一般社団法人AiCTコンソーシアム", logo: "/一般社団法人AiCTコンソーシアム.png", url: "", tier: "top" },

  { name: "会津土建株式会社", logo: "/会津土建株式会社.jpeg", url: "https://www.adoken.co.jp/", tier: "special" },

  { name: "株式会社三義漆器店", logo: "/株式会社三義漆器店.jpeg", url: "https://www.owanya.com", tier: 10 },
  { name: "ツルカメ建設株式会社", logo: "/ツルカメ建設株式会社.jpg", url: "https://tsurukame-construction.co.jp/", tier: 10 },

  { name: "株式会社会津精密技術研究所", logo: "/株式会社会津精密技術研究所.jpg", url: "", tier: 5 },
  { name: "リズム株式会社", logo: "/リズム株式会社.png", url: "", tier: 5 },
  { name: "金堀重機", logo: "/金堀重機.gif", url: "", tier: 5 },

  { name: "元祖輪箱飯（わっぱめし）割烹・会津料理 田季野", logo: "", url: "", tier: 1 },
  { name: "Glocal Dining bar 3rd place", logo: "", url: "", tier: 1 },
  { name: "ヒメジ理化株式会社", logo: "", url: "", tier: 1 },
  { name: "第一緑化工業株式会社", logo: "", url: "", tier: 1 },
  { name: "COOP BESTAにいでら", logo: "", url: "", tier: 1 },
  { name: "株式会社メカテック", logo: "", url: "", tier: 1 },
  { name: "有限会社武藤製作所", logo: "", url: "", tier: 1 },
  { name: "西田精機", logo: "", url: "", tier: 1 },
  { name: "東邦銀行", logo: "", url: "", tier: 1 },
  { name: "会津若松商工会", logo: "", url: "", tier: 1 },
];

const instagramProfileUrl = "https://www.instagram.com/aizu_base/";
const instagramPosts = [
  { url: "https://www.instagram.com/p/DbcyhTuRtcN/", caption: "会津じものまつりの最新情報" },
  { url: "https://www.instagram.com/reel/DdGW6JwRCnw/?stkn=MW0xbGZyN2lneXowaw==", caption: "駐車場ガイド" },
  { url: "https://www.instagram.com/reel/Dc5euTjxlCz/?stkn=aHBoZ2E0bmhrdDh2", caption: "ステージ出演決定" },
];

const faqs = [
  {
    question: "会津じものまつり 2026はいつ開催されますか？",
    answer: "2026年11月8日（日）の10:00から16:00まで開催します。",
  },
  {
    question: "会場はどこですか？",
    answer: "福島県会津若松市東栄町1-77のスマートシティAiCTと北出丸通りです。",
  },
  {
    question: "入場料はかかりますか？",
    answer: "入場は無料です。一部の体験、飲食、物販は有料です。",
  },
  {
    question: "どのようなイベントですか？",
    answer: "会津の食、農業、伝統工芸と、プログラミング・デザイン・AIなどのデジタル体験が集まる地域イベントです。ステージやシールラリーも予定しています。",
  },
  {
    question: "子どもも参加できますか？",
    answer: "子どもたちが農業、工芸、ITなどを楽しく学べる体験ブースを予定しています。ご家族でお楽しみください。",
  },
  {
    question: "雨天時や駐車場の案内はどこで確認できますか？",
    answer: "雨天時の開催方針、イベント当日の駐車場利用、交通規制などは、決まり次第この公式サイトと公式Instagramでお知らせします。",
  },
];

function SponsorLogoCard({ sponsor }: { sponsor: Sponsor }) {
  const body = sponsor.logo ? (
    <>
      <img src={sponsor.logo} alt={`${sponsor.name} ロゴ`} />
      <span>{sponsor.name}</span>
    </>
  ) : (
    <>
      <div className="sponsor-logo-placeholder">{sponsor.name}</div>
      <span aria-hidden="true">&nbsp;</span>
    </>
  );
  return sponsor.url ? (
    <a className="sponsor-logo-card" href={sponsor.url} target="_blank" rel="noreferrer">{body}</a>
  ) : (
    <div className="sponsor-logo-card">{body}</div>
  );
}

function SponsorFeatured({ sponsors, label, subLabel }: { sponsors: Sponsor[]; label?: string; subLabel?: string }) {
  return (
    <div className="sponsor-special">
      {label && <p className="sponsor-special-label">{label}{subLabel && <span>{subLabel}</span>}</p>}
      <div className="sponsor-special-list">
        {sponsors.map((sponsor) => {
          const body = (
            <>
              {sponsor.logo && <img src={sponsor.logo} alt={`${sponsor.name} ロゴ`} />}
              <span>{sponsor.name}</span>
            </>
          );
          return sponsor.url ? (
            <a className="sponsor-special-item" key={sponsor.name} href={sponsor.url} target="_blank" rel="noreferrer">{body}</a>
          ) : (
            <div className="sponsor-special-item" key={sponsor.name}>{body}</div>
          );
        })}
      </div>
    </div>
  );
}

// 幅に収まらないときだけ自動で横に流れ、指やマウスで手動スクロールもできる列。
// 触っている間・マウスを乗せている間は止まり、離すと少し待って再開する。
function SponsorMarquee({ className, children }: { className: string; children: ReactNode }) {
  const viewportRef = useRef<HTMLDivElement | null>(null);
  const groupRef = useRef<HTMLDivElement | null>(null);
  const [overflow, setOverflow] = useState(false);
  const pausedRef = useRef(false);
  const resumeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    const measure = () => setOverflow(group.offsetWidth - parseFloat(getComputedStyle(group).paddingRight) > viewport.clientWidth + 1);
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(group);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const viewport = viewportRef.current;
    const group = groupRef.current;
    if (!viewport || !group) return;
    if (!overflow) {
      viewport.scrollLeft = 0;
      return;
    }
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let pos = viewport.scrollLeft;
    let last = performance.now();
    let frame = 0;
    const speed = 40; // px/秒

    const wrap = () => {
      const loop = group.offsetWidth;
      if (loop > 0 && viewport.scrollLeft >= loop) {
        viewport.scrollLeft -= loop;
        pos = viewport.scrollLeft;
      }
    };
    const tick = (now: number) => {
      const dt = Math.min(now - last, 100);
      last = now;
      if (!pausedRef.current && !reduceMotion) {
        if (Math.abs(viewport.scrollLeft - pos) > 2) pos = viewport.scrollLeft; // 手動スクロールの位置を引き継ぐ
        pos += (speed * dt) / 1000;
        const loop = group.offsetWidth;
        if (loop > 0 && pos >= loop) pos -= loop;
        viewport.scrollLeft = pos;
      }
      frame = requestAnimationFrame(tick);
    };
    const onScroll = () => {
      if (pausedRef.current) pos = viewport.scrollLeft;
      wrap();
    };
    viewport.addEventListener("scroll", onScroll, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(frame);
      viewport.removeEventListener("scroll", onScroll);
    };
  }, [overflow]);

  const pause = () => {
    window.clearTimeout(resumeTimer.current);
    pausedRef.current = true;
  };
  const resume = (delay: number) => {
    window.clearTimeout(resumeTimer.current);
    resumeTimer.current = window.setTimeout(() => {
      pausedRef.current = false;
    }, delay);
  };

  return (
    <div
      className={`sponsor-scroller ${className}`}
      ref={viewportRef}
      onPointerEnter={(e) => { if (e.pointerType === "mouse") pause(); }}
      onPointerLeave={(e) => { if (e.pointerType === "mouse") resume(0); }}
      onTouchStart={pause}
      onTouchEnd={() => resume(2000)}
      onTouchCancel={() => resume(2000)}
      onWheel={() => { pause(); resume(2000); }}
    >
      <div className="sponsor-scroller-track">
        <div className="sponsor-scroller-group" ref={groupRef}>{children}</div>
        {overflow && <div className="sponsor-scroller-group" aria-hidden="true">{children}</div>}
      </div>
    </div>
  );
}

export default function Home() {
  const [igIndex, setIgIndex] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => setIgIndex((index) => (index + 1) % instagramPosts.length), 3500);
    return () => window.clearInterval(timer);
  }, []);

  const topSponsors = sponsors.filter((sponsor) => sponsor.tier === "top");
  const specialSponsors = sponsors.filter((sponsor) => sponsor.tier === "special");
  const tier10Sponsors = sponsors.filter((sponsor) => sponsor.tier === 10);
  const tier5Sponsors = sponsors.filter((sponsor) => sponsor.tier === 5);
  const textSponsors = sponsors.filter((sponsor) => sponsor.tier === 1);

  return (
    <main>
      <MenuHeader />

      <section className="hero" id="top">
        <div className="poster-wrap">
          <img
            className="hero-image"
            src="/aizu-jimono-poster.webp"
            alt="会津若松市で2026年11月8日に開催する会津じものまつり 2026のチラシ"
            width={1600}
            height={2263}
            fetchPriority="high"
            decoding="async"
          />
        </div>
        <div className="hero-copy">
          <p className="eyebrow hero-reveal hero-reveal-1">AIZU JIMONO MATSURI 2026</p>
          <h1>
            <span className="hero-event-name hero-reveal hero-reveal-2">会津じものまつり 2026</span>
            <span className="hero-tagline-line hero-reveal hero-reveal-3 hero-line-first">知って、食べて、踊って、</span>
            <span className="hero-tagline-line hero-reveal hero-reveal-4">会津の「今」と</span>
            <span className="hero-tagline-line hero-reveal hero-reveal-5">「これから」を、ともにつくる一日。</span>
          </h1>
          <p className="hero-summary hero-reveal hero-reveal-6">2026年11月8日、福島県会津若松市で開催する、食・伝統工芸・農業・デジタルを親子で楽しめる体験型イベントです。</p>
          <div className="hero-tags hero-reveal hero-reveal-6" aria-label="イベントの内容">
            <span>体験</span><span>飲食</span><span>ステージ</span>
          </div>
          <div className="hero-facts">
            <p><strong>2026.11.8 <em>SUN</em></strong><span>10:00—16:00</span></p>
            <p><strong>北出丸通り・スマートシティAiCT</strong><span>入場無料　※一部ブースは有料です</span></p>
          </div>
          <a className="primary-button" href="#recruit">募集はこちら！</a>
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
            item.closed ? (
              <div className="recruit-card is-closed" key={item.title}>
                <div className="card-top"><span className="seal">{item.icon}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="status is-closed"><i /> 募集終了しました</div>
                <span className="recruit-link is-closed">たくさんのご応募ありがとうございました</span>
              </div>
            ) : (
              <a className="recruit-card" key={item.title} href={item.url} target={item.url.startsWith("http") ? "_blank" : undefined} rel={item.url.startsWith("http") ? "noreferrer" : undefined}>
                <div className="card-top"><span className="seal">{item.icon}</span><small>{String(index + 1).padStart(2, "0")}</small></div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="status"><i /> 募集中！</div>
                <span className="recruit-link">募集要項・応募フォーム <b aria-hidden="true">→</b></span>
              </a>
            )
          ))}
        </div>
      </section>

      <section className="sponsors section" id="sponsors">
        <div className="section-heading"><p className="eyebrow">SPONSORS</p><h2>協賛企業</h2></div>
        <div className="sponsor-tiers">
          {topSponsors.length > 0 && <SponsorFeatured sponsors={topSponsors} />}
          {specialSponsors.length > 0 && (
            <SponsorFeatured sponsors={specialSponsors} label="SPECIAL SPONSOR" subLabel="スペシャルスポンサー" />
          )}
          {tier10Sponsors.length > 0 && (
            <SponsorMarquee className="sponsor-logo-list-10">
              {tier10Sponsors.map((sponsor) => <SponsorLogoCard key={sponsor.name} sponsor={sponsor} />)}
            </SponsorMarquee>
          )}
          {tier5Sponsors.length > 0 && (
            <SponsorMarquee className="sponsor-logo-list-5">
              {tier5Sponsors.map((sponsor) => <SponsorLogoCard key={sponsor.name} sponsor={sponsor} />)}
            </SponsorMarquee>
          )}
          {textSponsors.length > 0 && (
            <SponsorMarquee className="sponsor-name-list">
              {textSponsors.map((sponsor) => <span className="sponsor-name" key={sponsor.name}>{sponsor.name}</span>)}
            </SponsorMarquee>
          )}
        </div>
      </section>

      <section className="access section" id="access">
        <div><p className="eyebrow">EVENT INFORMATION</p><h2>開催情報</h2></div>
        <dl>
          <div><dt>日時</dt><dd><strong>2026年11月8日（日）</strong><br />10:00〜16:00</dd></div>
          <div><dt>会場</dt><dd><strong>スマートシティAiCT・北出丸通り</strong><br />〒965-0872 福島県会津若松市東栄町1-77</dd></div>
          <div><dt>入場料</dt><dd><strong>無料</strong><br />※一部の体験・飲食・物販は有料です。</dd></div>
          <div><dt>雨天時</dt><dd>開催方針は決まり次第お知らせします。</dd></div>
        </dl>
        <div className="access-links">
          <a href="https://maps.google.com/?q=スマートシティAiCT" target="_blank" rel="noreferrer">Googleマップで見る ↗</a>
          <a href="https://aizu-aiyumu.co.jp/about/" target="_blank" rel="noreferrer">会場の公式情報を見る ↗</a>
        </div>
      </section>

      <section className="faq section" id="faq">
        <div className="section-heading">
          <p className="eyebrow">FREQUENTLY ASKED QUESTIONS</p>
          <h2>よくある質問</h2>
          <p className="faq-intro">会津じものまつり 2026の開催日、会場、料金、内容についてご案内します。</p>
        </div>
        <div className="faq-list">
          {faqs.map((faq) => (
            <details key={faq.question}>
              <summary>{faq.question}</summary>
              <p>{faq.answer}</p>
            </details>
          ))}
        </div>
      </section>

      <section className="coming section" id="news">
        <p className="eyebrow">COMING SOON</p><h2>出店者・プログラムは<br />近日公開</h2><p>詳しい出店情報やタイムテーブルは、決まり次第この公式サイトと公式Instagramでお知らせします。</p>
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
