BugFix: If the user is not logged in then redirect /browse to login page and vice versa.

Unscribed to the onAuthStateChange callback function otherwise it will be called everytime the header is rendered and the useEffect is called.
