# このリポジトリについて
product2025開発で使用します

# DBログイン
環境変数に接続設定保存し接続します

# 仮想環境の立ち上げ
以下コマンドで仮想環境を起動します
```
(初回のみ)
python3 -m venv .venv

(mac)
source .venv/bin/activate 
(win)
.venv/bin/activate

pip install -r requirements.txt
```

# 仮想環境の終了
以下コマンドで仮想環境を終了します
```
deactivate
```

# 起動方法
仮想環境を立ち上げた状態で以下コマンドを実行し、FastAPIを起動します
```
cd python/backend/app
uvicorn main:app --reload
```

# (ローカルで起動する場合)Postgresql側の設定
ローカルで設定する場合は、以下3つの情報をあらかじめ用意しておきます
1. Postgresにログインできるユーザー名 *1
2. 上記ユーザーのパスワード *2
3. 上記ユーザーがログインできるDB名 *3

# (初期設定) スーパーユーザーの作成
1. /backend/db/.env ファイル内の以下3つの環境変数を編集し、スーパーユーザの設定を完了します
```
SQL_USERNAME= # *1と対応 
SQL_PASSWORD= # *2と対応
DB_NAME= # *3と対応
```
2. 以下コマンドを実行し、Postgresのuserテーブルに上記情報をもとにした新規スーパーユーザーを作成します
```
python initial_data.py
```

# FastAPIでHelloworldが表示されるかの確認

下記アドレスでHelloworldが表示されればAPIの動作は問題ないです
```
下記のアドレスへアクセス
http://localhost:8000/api/v1/
```

# FastAPI上でのOAuth認証
1. 「FastAPI起動時のURI + /docs」からFastAPIのWebアプリにアクセスすると、Swaggerの画面が表示されます。ここから画面右上にある[Authorize]をクリックします
```
http://127.0.0.1:8000/docs
```
2. [username]と[password]にbackend/app/db/.envファイルに設定したusernameとpasswordを記入し、signinします
3. 無事認証されると、全てのCRUDが利用可能となります


# DBからのデータ取得
```
http://localhost:8000/api/v1/helloworld
```
上記の値がhelloworldもしくはhelloworld2になっていればOK,この値はDBのhelloworldテーブルから取得しています
