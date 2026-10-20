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

Gitのタグ `live-日付` が、その日に公開されていた状態です。最初は `live-2026-10-20`、以後は公開のたびに追加します
（詳しくは「引き継ぎ・初回セットアップ」の手順3と4）。

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
5. 公開に成功したら、**変更を保存（コミット）し、戻り先の目印（タグ）を付ける。**
   Claudeに「公開した状態を保存して、今日の日付のタグ `live-YYYY-MM-DD` を付けて」と頼む。
   同じ日に複数回公開したら `live-YYYY-MM-DD-2` のように番号を足す。

### 4. 元に戻すとき
- フォルダ内にGitの履歴があります。`git log` で履歴を見られ、Claudeに「公開中だった状態に戻して」と頼めます。
- タグ `live-日付` は「その日に公開していた状態」の目印です。**戻り先は常に最新の `live-` タグ**です。
  公開のたびに新しいタグを付けることで、戻り先も更新されていきます（手順3の5）。
- 引き継ぎ時点の最初の目印は `live-2026-10-20` です。
- 戻し方の例: Claudeに「最新の `live-` タグの状態に戻して」と頼み、`npm test` と `npm run dev` で確認してから再公開する。
- この履歴はこのPC内にしかありません。**定期的にフォルダをGoogleドライブなどへコピー**してバックアップしてください。

### 5. 触らない方がよいファイル
`worker/index.ts`、`vite.config.ts`、`.openai/`、`db/`、`drizzle/` はデプロイの仕組みに関わります。変更が必要なときは慎重に。

### 6. 失効・停止すると困るもの
- 独自ドメイン `aizujimono.jp` は、Cloudflareと同じ**共同アカウント（aizubase用）**で管理しています。
  更新期限と自動更新、支払いカードの期限をCloudflareのダッシュボードで確認しておくこと。
- 共同Cloudflareアカウントのメンバー権限と支払い設定。オーナーは複数人にしておくと安全。
- 募集用のGoogleフォーム3つ（飲食・体験ブース・協賛）は、フォームごとに所有者が別です。
  サイトの動作には影響しませんが、次の場合は注意してください。
  - フォームのURLが変わった・作り直した場合: `app/page.tsx` の `recruitments` の `url` を差し替える。
  - 募集を締め切る場合: 同じ配列で `closed: true` にする。フォーム側の受付停止は、各フォームの所有者が行う。
