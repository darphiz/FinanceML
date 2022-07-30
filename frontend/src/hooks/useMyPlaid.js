import React from "react"
import backend from "../api_interface"
import { useLinkToken } from "../stores"
import { usePlaidLink } from "react-plaid-link"

function useMyPlaid() {
  const [linkToken, setLinkToken] = useLinkToken((state) => [state.linkToken, state.setLinkToken])

  // console.log(backend)

  const onSuccess = React.useCallback(async (publicToken) => {
    // setLoading(true);  plaid/exchange_public_token/

    try {
      const response = await backend.post("api/plaid/exchange_public_token/", {
        public_token: publicToken,
      })
      if (response.status === 200) {
        console.log("it works")
      } else {
        console.log("it didnt work")
      }
    } catch (e) {
      console.error("Error ex point:  " + e)
    }
  }, [])

  const createLinkToken = React.useCallback(async () => {
    if (window.location.href.includes("?oauth_state_id=")) {
      localStorage.getItem("link_token")
      setLinkToken(linkToken)
    } else {
      const { data } = await backend.post("api/plaid/create_link_token/")

      setLinkToken(data.link_token)
      localStorage.setItem("link_token", data.link_token)
    }
  }, [linkToken, setLinkToken])

  let isOauth = false

  const config = {
    token: linkToken,
    onSuccess,
  }

  if (window.location.href.includes("?oauth_state_id=")) {
    config.receivedRedirectUri = window.location.href
    isOauth = true
  }

  const { open, ready } = usePlaidLink(config)

  return { open, ready, isOauth, createLinkToken, linkToken }
}

export default useMyPlaid
