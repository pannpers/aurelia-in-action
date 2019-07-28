# Aurelia In Action

https://livebook.manning.com/book/aurelia-in-action


# Setting up Aurelia Project
```
$ au new my-books --unattended --select cli-bundler,alameda,typescript,sass,postcss-typical,jest,cypress,vscode --here 
```

```
npm install \
  eslint \
  eslint-config-airbnb-base \
  eslint-config-prettier \
  eslint-plugin-import \
  eslint-plugin-prettier \
  prettier \
  @typescript-eslint/eslint-plugin \
  @typescript-eslint/parser
```

# Translate
https://livebook.manning.com/#!/book/aurelia-in-action/aurelia-glossary/

- Component
Aureliaアプリケーションは独立した役割と責務を持った様々なComponentを組み合わせることで構築されます。
- View-model
Aureliaアプリケーションの中では、ほとんどのComponentはView-modelと呼ばれるJavaScript、もしくはTypeScriptのClassを持っています。
- View
Aureliaアプリケーションは1つ以上のViewを持っています。このClassはあなたのComponentの振る舞いを実装します。
- Data binding
Data bindingはJavaScriptのView-modelからDOMへデータをレンダリングできるようにします。また、DOMイベントに対応した、View-model内でのデータ更新も可能にします。
- Custom element
Custom elementはUIウィジェットをカプセル化し、SPAのViewの中に含めさせます。あなたはこれらのElementを、慣れ親しんだ標準のHTML要素のように宣言的に使うことができます。
- Custom attribute
Aureliaは標準、もしくはカスタムHTML elementの振る舞いを豊かにさせるよう、装飾することができます。
- Value converter
Value converterはデータがView-modelとViewの間を行き来するときに変化を加えさせることができます。典型的な例はユーザーのロケーションに応じて日付や通貨の表現を変えることです。
- Binding behavior
Binding behaviorはバインディングをどのように機能させるか変更することができます。例えばb、throttle binding behaviorはバインディングの更新がViewからView-modelに送信される頻度を制御できるようにします。
- View-engine hook
これらはAureliaのComponentライフサイクルの様々なポイント（例えば、ViewがDOMに組み込まれた時）で独自の振る舞いをView-modeに持たせるためのコールバックです。
- Router
AureliaのRouterはアプリケーションのルート（アプリケーションのURL）に対応して、Componentをロードできるようにします。例えば、 `/app#/blog` をブログComponentにマッピングします。そして、ユーザーがブラウザでそのURLに遷移した時、AureliaはComponentをロードし、DOMにレンダリングします。
