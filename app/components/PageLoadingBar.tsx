"use client"

import { useNavigation } from "@remix-run/react"
import NProgress from "nprogress"
import { useEffect, useLayoutEffect } from "react"

import "./PageLoadingBar.css"

export function PageLoadingBar() {
  const navigation = useNavigation()
  useLayoutEffect(() => {
    NProgress.configure({ showSpinner: false })
  }, [])

  useEffect(() => {
    switch (navigation.state) {
      case "idle":
        NProgress.done()
        break
      case "submitting":
      case "loading":
        if (NProgress.isStarted() == false) NProgress.start()
        break
    }
  }, [navigation])
  return null
}
