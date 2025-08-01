# RemainChecker

## **概要**

- 余命を表示するアプリです。
- アプリ利用者と登録した人物の余命をカウントダウン形式で確認できます。
- アプリ利用者の余命は、ログイン/非ログインに関わらず表示できます。

<p align="center">
  <img src="https://github.com/YutoOtake0015/RemainChecker-demo/assets/120574251/7a18c265-3bb7-4b6b-907f-f53a92863e64" width="49%" />
  <img src="https://github.com/YutoOtake0015/RemainChecker-demo/assets/120574251/17d32c09-8126-43b5-9e45-c602646c6cf0" width="49%" /> 
</p>

## **目的**

- アプリ利用者が自分に残された時間が少ないことを意識し、行動が促されること。
- 自分が納得のできる、意味のある日々を過ごすこと。

- 以下の要素によって、残りの人生で使用できる時間を強く意識することを期待しています。
  - 「**余命**」の文言
  - 余命の数値による可視化
  - 大切な人と過ごせる時間の表示

## **ターゲット** <br />

- 行動力を向上させたい人
- 意味のある日々を過ごしたい人

# サイト URL

https://remain-checker.com<br >

## ゲストログイン

トップページでログインボタンを押下して遷移したログイン画面で以下の値を入力してください。

- メールアドレス
  - **`test@sample.com`**
- パスワード
  - **`1234567a`**

# 使用技術

| カテゴリ           | 技術              | バージョン         |
| ------------------ | ----------------- | ------------------ |
| **フロントエンド** | HTML              | -                  |
|                    | CSS               | -                  |
|                    | JavaScript        | -                  |
|                    | TypeScript        | 5.8.3              |
|                    | React             | 19.1.0             |
|                    | Next.js           | 15.3.3             |
|                    | Material UI (MUI) | 7.1.0              |
|                    | Jotai             | 2.12.5             |
|                    | React Router DOM  | 6.30.1             |
|                    | React Spinners    | 0.17.0             |
| **バックエンド**   | TypeScript        | 5.3.3              |
|                    | Node.js           | 20.8.0             |
|                    | Express           | 4.18.2             |
|                    | Prisma            | 5.5.2              |
|                    | ts-node           | 10.9.2             |
|                    | bcrypt            | 5.1.1              |
|                    | cors              | 2.8.5              |
|                    | dotenv            | 16.3.1             |
|                    | joi               | 17.11.0            |
|                    | jsonwebtoken      | 9.0.2              |
|                    | nodemon           | 3.0.1              |
| **データベース**   | PostgreSQL        | 15.1 (Supabase)    |
| **実行環境**       | Vercel            | - (フロントエンド) |
|                    | Render            | - (バックエンド)   |

## データベーススキーマ

```mermaid
erDiagram

  "AverageLife" {
    Float age
    String sex "🗝️"
    String year "🗝️"
    }


  "User" {
    Int id "🗝️"
    String username
    String email
    String password
    }


  "Person" {
    Int id "🗝️"
    String personName
    String sex
    DateTime birthDate
    Boolean isAccountUser
    Int userId
    }

    Person ||--o{ User : "userId"
```

# 環境構築　〜　ローカル実行方法

## 前提条件

- データベースは事前に作成してください。
- Node.js は事前にインストールしてください。

## 実施手順

1. ローカルにソースコードをダウンロードする。

```zsh
git clone https://github.com/YutoOtake0015/RemainCheck.git
```

2. frontend ディレクトリと backend ディレクトリに cd コマンドで移動。
3. 2 の各ディレクトリでライブラリをインストールする。

```zsh
npm install
```

4. frontend ディレクトリに直下に`.env.local`ファイルを作成し、以下環境変数を記述する。

```
NEXT_PUBLIC_API_BASEURL="http://localhost:(サーバのポート)/api"
COOKIE_DOMAIN="localhost"
```

**注**："(サーバのポート)" は、手順 5 で作成する`.env`ファイルの PORT に設定した値に置き換えてください。

5. backend ディレクトリ直下に`.env`ファイルを作成し、以下環境変数を記述する。

```
DATABASE_URL="(データベースへの接続文字列)"
JWT_SECRET_KEY="(任意の文字列)"
CLIENT_ORIGIN="(クライアントのベースURL)"
PORT="(サーバのポート)"
```

**注**："(データベースへの接続文字列)", "(任意の文字列)", "(クライアントのベース URL)", "(サーバのポート)"は、任意の値に置き換えてください。

6. prisma/schema.prisma の`provider`に使用するデータベースの種類を記入する。
   ※本アプリではデフォルトで`postgresql`を使用しています。 <br />
   変更する場合、https://www.prisma.io/docs/orm/overview/databases を参考にしてください。

7. backend ディレクトリで以下のコマンドを実行してテーブルを作成する。

```zsh
npx prisma migrate dev --name init
```

※履歴から実行できないコマンドがある場合、backend ディレクトリで以下のコマンドで履歴ファイルを削除して、再度手順 7 を実施してください。

```zsh
rm -rf prisma/migrations
```

8. データベースに接続し、以下コマンドで平均寿命を登録する。

```sql
INSERT INTO AverageLife (age, sex, year) VALUES (81.05, 'male', '2022');
INSERT INTO AverageLife (age, sex, year) VALUES (87.09, 'female', '2022');
```

9. 2 の各ディレクトリで以下のコマンドを実行してアプリを起動する。

```zsh
npm run dev
```

10. frontend ディレクトリで 9 を実行すると表示される、`http://localhost:xxxxxxx` にアクセスする。

# サイト機能一覧

本アプリで実装した機能は以下の通りです。

- サインアップ
- ログイン
- サインアウト
- ユーザ情報編集
  - ユーザのメールアドレス、パスワードを変更する機能
- 余命表示
  - ユーザの余命を表示する機能
- 余命一覧表示
  - 登録された人物情報を表形式で表示する機能
- 余命登録
  - ユーザ以外の人物情報を新規登録する機能
- 余命編集
  - 登録された人物情報を編集する機能

以上の中でさらに説明が必要な機能、処理を以下に追記します。

## ユーザ認証

ユーザの識別は、ログイン時にバックエンドで発行される JWT(JSON Web Token)によって識別しています。 <br />
token は各ユーザが使用するブラウザの Cookie に保管します。

## 余命算出

余命は、前年度の平均寿命から人物の年齢を減算することで算出しています。 <br />
平均寿命は、厚生労働省が発表した前年度の平均寿命を用いており、性別、年度ごとに AverageLife テーブルで管理しています。 <br />
値はすべて秒に変換し、表示する単位(年ヶ月日時分秒)に応じて変換処理を実行しています。 <br />

余命がマイナスの人物は、「**無限の可能性が広がっています**」と表示されます。

### 計算式

- 年齢(秒) = 現在日時(秒) - 生年月日(秒)
- 余命(秒) = 前年度平均寿命(秒) - 年齢(秒)

## 余命一覧表示

登録した人物の情報は、表形式で一覧表示しています。 <br />
余命をソートすることで、残りの時間が短い人の特定、寿命の比較が容易にできます。<br />

例えば、余命が短い人物が判明した場合、その人と会う回数を多くすることで

# 今後の実装予定

- パスワード再設定機能
- 他サービスアカウントでの認証機能
- 余命通知機能
  - 指定のタイミングで余命をメールアドレス宛に送信する機能。
  - アプリ未使用時であっても余命を意識できることで、本アプリの効果を受けることができます。
- 目標設定機能
  - 自分、他者に残された時間を参考に目標を立てる機能。
  - 残された時間を計画的に過ごすことで、やらなかった後悔を減らすことができます。
- スマートフォンアプリでの使用
  - 持ち歩くことの多いスマートフォンでアプリを使用できることにより、余命の確認をより手軽に行えます。
