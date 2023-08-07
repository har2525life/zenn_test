### git clone後の手順

#### frontend
frontendフォルダ階層にて
```
npm run dev
```

####　backendフォルダ
.envファイルの作成
```
MYSQL_USER=<ユーザー名>
MYSQL_PASSWORD=<パスワード>
```
2つを記述したenvファイルを作成しましょう。
作成が終わったら、backendフォルダ階層にて、
```
npm start
```

上記を行えば問題なく動作するかと思います。
