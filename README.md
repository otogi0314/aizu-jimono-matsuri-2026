# 会津じものまつり 2026 公式サイト

公開URL: https://aizujimono.jp （`www` 付きは自動で `aizujimono.jp` に転送）

## 構成

- フレームワーク: [vinext](https://github.com/cloudflare/vinext)（Next.js互換）+ React 19 + Tailwind 4
- ホスティング: Cloudflare Workers（Worker名 `aizu-jimono-matsuri`、独自ドメイン設定は `vite.config.ts`）
- データベース: 使用していません（`db/`、`drizzle/` はテンプレの名残で未使用）
- 募集・申込: すべてGoogleフォームへのリンクです

## 主なファイル

| ファイル | 内容 |
|---|---|
| `app/page.tsx` | ページ本体。文章、日時、募集、協賛企業（`sponsors`）、FAQなど |
| `app/layout.tsx` | タイトル、説明文、OGP、検索エンジン向け構造化データ |
| `app/MenuHeader.tsx` | ハンバーガーメニュー |
| `app/globals.css` | 色、余白、アニメーション |
| `public/` | 画像、協賛企業ロゴ |
| `worker/index.ts` | www転送と画像最適化（通常は触らない） |
| `vite.config.ts` | ビルドとCloudflare設定（通常は触らない） |
| `編集ガイド.md` | 非エンジニア向けの編集手順 |

## コマンド

```bash
npm install            # 初回のみ
npm run dev            # 手元で確認 (http://localhost:3000)
npm test               # ビルドして自動テスト
npm run deploy:cloudflare   # 本番へ公開（Cloudflareへのログインが必要）
```

Node.js 22.13 以上が必要です。

## 公開状態への目印

Gitのタグ `live-2026-10-20` が、2026年10月20日時点で公開されていた状態です。
