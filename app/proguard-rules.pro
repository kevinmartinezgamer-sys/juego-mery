# Mantener clases de WebView intactas
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}
