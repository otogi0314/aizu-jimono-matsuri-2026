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

## 引き継ぎ・初回セットアップ

このサイトはGitHubを使わず、フォルダ一式で引き継ぎます。Claude（Claude Codeなど）でこのフォルダを開き、
「READMEを読んで、セットアップと公開までお願い」と頼めば進められます。

### 1. 準備（初回のみ）
1. Node.js 22.13以上をインストールする。
2. このフォルダで `npm install` を実行する。
3. `npm test` を実行し、4件とも通ることを確認する。

### 2. Cloudflareのログイン（初回のみ）
- 公開先のCloudflareは**共同アカウント**です。ログインできる自分のメンバー権限（Workersの編集）が必要です。
- `npx wrangler login` を実行すると、ブラウザが開くので、共同アカウントのメンバーとして承認する。
- 確認: `npx wrangler whoami` で共同アカウントが表示されればOK。

### 3. 更新して公開する
1. Claudeに変更を頼む（例:「協賛企業に〇〇株式会社を5万円枠で追加して。ロゴは `public/` に置いた画像」）。
2. `npm run dev` で手元で表示を確認する。
3. `npm test` が通ることを確認する。
4. `npm run deploy:cloudflare` で公開する。**公開は必ず内容を確認してから**行う。

### 4. 元に戻すとき
- フォルダ内にGitの履歴があります。`git log` で履歴を見られ、Claudeに「公開中だった状態に戻して」と頼めます。
- タグ `live-2026-10-20` は、引き継ぎ時点で公開されていた状態です。
- この履歴はこのPC内にしかありません。**定期的にフォルダをGoogleドライブなどへコピー**してバックアップしてください。

### 5. 触らない方がよいファイル
`worker/index.ts`、`vite.config.ts`、`.openai/`、`db/`、`drizzle/` はデプロイの仕組みに関わります。変更が必要なときは慎重に。

### 6. 失効・停止すると困るもの
- 独自ドメイン `aizujimono.jp` の更新期限（管理元・支払い者を確認しておくこと）
- 共同Cloudflareアカウントのメンバー権限と支払い設定
- 募集用のGoogleフォーム3つ（飲食・体験ブース・協賛）の所有者・共同編集者
