# 会津じものまつり ホームページ編集ガイド

## 1. パソコンで開く

1. ZIPファイルを展開します。
2. Visual Studio Codeで、展開したフォルダを開きます。
3. Node.js 22.13以上をインストールします。
4. Visual Studio Codeの「ターミナル」→「新しいターミナル」を開き、次を実行します。

```powershell
npm install
npm run dev
```

5. ターミナルに表示されたURL（通常は `http://localhost:3000`）をブラウザで開きます。
6. ファイルを保存すると、ブラウザの表示が自動更新されます。

終了するときは、ターミナルで `Ctrl + C` を押します。

## 2. 主に編集するファイル

| ファイル | 編集内容 |
|---|---|
| `app/page.tsx` | 日時、文章、募集項目、開催情報、各セクション |
| `app/MenuHeader.tsx` | ハンバーガーメニューの項目、リンク、開閉動作 |
| `app/globals.css` | 色、余白、文字サイズ、フェードイン、メニューの見た目 |
| `public/aizu-jimono-poster.png` | ファーストビューの宣材画像 |

## 3. ファーストビューのフェードインを調整する

`app/globals.css` の次の部分を編集します。

```css
.poster-wrap img {
  animation: hero-image-reveal 2.2s cubic-bezier(.22,.65,.3,1) both;
}

@keyframes hero-image-reveal {
  0% { opacity: 0; filter: blur(14px); transform: scale(1.035); }
  35% { opacity: .55; }
  100% { opacity: 1; filter: blur(0); transform: scale(1); }
}
```

- `2.2s`：アニメーション時間。例：`3s` にするとゆっくりになります。
- `blur(14px)`：開始時のぼかし。数値を増やすほど強くぼけます。
- `opacity: 0`：開始時の透明度。`0.2` なら少し見えた状態から始まります。
- `scale(1.035)`：開始時の拡大率。不要なら `scale(1)` にします。

動きを完全に止める場合は、`.poster-wrap img` の `animation` を削除します。

## 4. ハンバーガーメニューの項目を編集する

`app/MenuHeader.tsx` の冒頭にある `menuItems` を編集します。

```tsx
const menuItems = [
  { href: "#recruit", label: "各種募集" },
  { href: "#about", label: "祭りについて" },
  { href: "#experience", label: "楽しみ方" },
  { href: "#access", label: "開催情報・アクセス" },
  { href: "#news", label: "お知らせ" },
];
```

メニューを追加する例：

```tsx
{ href: "#sponsors", label: "協賛企業" },
```

移動先のセクションには、同じ名前の `id` が必要です。

```tsx
<section id="sponsors">
```

## 5. ハンバーガーメニューの見た目を編集する

`app/globals.css` の次のクラスを変更します。

- `.site-header`：追従ヘッダーの位置と余白
- `.menu-toggle`：右上の丸いボタン
- `.site-header nav`：開いたメニューパネル
- `.menu-backdrop`：メニュー背後の暗い領域

ボタンを四角くする例：

```css
.menu-toggle {
  border-radius: 8px;
}
```

メニュー幅を変更する例：

```css
.site-header nav {
  width: min(520px, 92vw);
}
```

## 6. 文章や募集項目を編集する

`app/page.tsx` の上部にある `recruitments` が募集カードです。

```tsx
const recruitments = [
  {
    icon: "食",
    title: "飲食・キッチンカー",
    text: "会津のおいしさを届ける飲食出店者を募集します。"
  },
];
```

開催日時・会場・入場料なども `app/page.tsx` 内の文字を直接変更できます。

## 7. 宣材画像を差し替える

新しい画像を `public` フォルダへ入れ、ファイル名を
`aizu-jimono-poster.png` にすると、コードを変えずに差し替えられます。

別のファイル名にする場合は、`app/page.tsx` の次の箇所も変更します。

```tsx
<img src="/新しい画像名.png" alt="会津じものまつりの宣材ビジュアル" />
```

## 8. 公開前に確認する

次を実行して、エラーがないことを確認します。

```powershell
npm run build
```

パソコン上で編集しただけでは、現在公開中のホームページには反映されません。
公開には、公開先のCloudflareアカウントでの作業が必要です。
