import * as WebBrowser from "expo-web-browser";

export function useWarmUpBrowser() {
  WebBrowser.warmUpAsync();
}
