"use client"
import { resetTheme } from "src/store/reducers/CheckThemeReducer";
import { store } from "../store/store";
import localeTranslations from './locale/en.json';
import { resetLanguage } from "src/store/reducers/languageReducer";
import { resetCat } from "src/store/reducers/CatNavReducers";
import { resetCheckNews } from "src/store/reducers/CheckNewsDataReducer";
import { resetPermission } from "src/store/reducers/CheckPermissionsReducer";
import { resetCreateNews } from "src/store/reducers/createNewsReducer";
import { resetFeatureLayout } from "src/store/reducers/featureLayoutReducer";
import { logoutUser } from "src/store/reducers/userReducer";
import { resetMorePages } from "src/store/reducers/MorePagesReducers";
import { resetNews } from "src/store/reducers/newsReducer";
import { resetNotificationBadge } from "src/store/reducers/notificationbadgeReducer";
import { resetSettings } from "src/store/reducers/settingsReducer";
import { resetTemp } from "src/store/reducers/tempDataReducer";



export const getSiblings = function (elem) {
  let siblings = [];
  let sibling = elem.parentNode.firstChild;
  while (sibling) {
    if (sibling.nodeType === 1 && sibling !== elem) {
      siblings.push(sibling);
    }
    sibling = sibling.nextSibling;
  }
  return siblings;
};

export const getClosest = function (elem, selector) {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
};

export const slideUp = (element, duration = 500) => {
  return new Promise(function (resolve) {
    element.style.height = element.offsetHeight + "px";
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = duration + "ms";
    // element.offsetHeight;
    element.style.overflow = "hidden";
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    window.setTimeout(function () {
      element.style.display = "none";
      element.style.removeProperty("height");
      element.style.removeProperty("padding-top");
      element.style.removeProperty("padding-bottom");
      element.style.removeProperty("margin-top");
      element.style.removeProperty("margin-bottom");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition-duration");
      element.style.removeProperty("transition-property");
      resolve(false);
    }, duration);
  });
};

export const slideDown = (element, duration = 500) => {
  return new Promise(function () {
    element.style.removeProperty("display");
    let display = window.getComputedStyle(element).display;

    if (display === "none") display = "block";

    element.style.display = display;
    let height = element.offsetHeight;
    element.style.overflow = "hidden";
    element.style.height = 0;
    element.style.paddingTop = 0;
    element.style.paddingBottom = 0;
    element.style.marginTop = 0;
    element.style.marginBottom = 0;
    // element.offsetHeight;
    element.style.transitionProperty = `height, margin, padding`;
    element.style.transitionDuration = duration + "ms";
    element.style.height = height + "px";
    element.style.removeProperty("padding-top");
    element.style.removeProperty("padding-bottom");
    element.style.removeProperty("margin-top");
    element.style.removeProperty("margin-bottom");
    window.setTimeout(function () {
      element.style.removeProperty("height");
      element.style.removeProperty("overflow");
      element.style.removeProperty("transition-duration");
      element.style.removeProperty("transition-property");
    }, duration);
  });
};

export const slideToggle = (element, duration = 500) => {
  if (window.getComputedStyle(element).display === "none") {
    return slideDown(element, duration);
  } else {
    return slideUp(element, duration);
  }
};

// is login user check
export const isLogin = () => {
  let user = store.getState().user;
  if (user) {
    try {
      // user = JSON.parse(user);
      if (user.data.firebase_id) {
        return true;
      }
      return false;
    } catch (error) {
      return false;
    }
  }
  return false;
};

export const translate = (label) => {

  /*Set default Label only if you want custom label */
  let langLabel =
    store.getState().languages?.currentLanguageLabels.data &&
    store.getState().languages?.currentLanguageLabels.data[label];
  let enTranslation = localeTranslations


  if (langLabel) {
    return langLabel;

  } else {

    return enTranslation[label];

  }
};

// server image error
export const imgError = (e) => {
  e.target.src = "/assets/images/no_image.jpeg";
};


// placholder image
export const placeholderImage = (e) => {
  e.preventDefault()
  const settingsData = store.getState().settings
  const darkThemeMode = store.getState().checkTheme
  const isDarkMode = darkThemeMode?.data?.isDarkMode;
  // console.log(darkThemeMode.data.isDarkMode,'theemmee ')
  e.target.src = isDarkMode ? settingsData && settingsData?.data?.web_setting?.dark_placeholder_image : settingsData && settingsData?.data?.web_setting?.light_placeholder_image
};

// truncate text
export const truncateText = (text, characterLimit) => {
  if (text?.length > characterLimit) {
    const truncatedText = text.substring(0, characterLimit) + "...";
    return truncatedText;
  }
  return text;
};

// server image error
export const profileimgError = (e) => {
  e.target.src = "/assets/images/user.svg"
}

export const NoDataFound = () => {
  return <div className='no_data_found text-center my-5'>{translate('nodatafound')}</div>
}

export const profileimg = "/assets/images/user.svg"


// minute read
export const calculateReadTime = (text) => {
  const wordsPerMinute = 200;
  const wordCount = text.trim().split(' ').length;
  const readTime = Math.ceil(wordCount / wordsPerMinute);
  return readTime;
};

export const extractTextFromHTML = (html) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  return doc.body.textContent || "";
};

export const stripHtmlTags = (htmlString) => {
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlString;
  return tempDiv.textContent || tempDiv.innerText || '';
};

export const extractJSONFromMarkup = (markupString) => {
  const jsonRegex = /<script type="application\/ld\+json">(.*?)<\/script>/s;
  const match = markupString.match(jsonRegex);

  if (match && match.length >= 2) {
    const extractedJSON = match[1];

    try {
      return JSON.parse(extractedJSON);
    } catch (error) {
      console.error('Error parsing JSON:', error);
    }
  }

  return null;
};

// export const formatDate = (originalDate) => {
//   if (!originalDate) return ""; // Handle the case when the date is not available

//   // Create a new Date object with the given string
//   const parsedDate = new Date(originalDate);

//   // Extract day, month, and year
//   const day = parsedDate.getDate();
//   const month = parsedDate.getMonth() + 1; // Month is zero-based, so add 1
//   const year = parsedDate.getFullYear();

//   // Create the formatted date string in the desired format
//   const formattedDate = `${day < 10 ? '0' : ''}${day}-${month < 10 ? '0' : ''}${month}-${year}`;

//   return formattedDate;
// };

export const formatDate = (dateString) => {
  const options = { day: 'numeric', month: 'numeric', year: 'numeric', };
  return new Date(dateString).toLocaleDateString('en-IN', options);
};


export const getAuthErrorMessage = (errorCode) => {
  switch (errorCode) {
    case "auth/admin-restricted-operation":
      return "Admin Only Operation";
    case "auth/already-initialized":
      return "Already Initialized";
    case "auth/app-not-authorized":
      return "App Not Authorized";
    case "auth/app-not-installed":
      return "App Not Installed";
    case "auth/argument-error":
      return "Argument Error";
    case "auth/captcha-check-failed":
      return "Captcha Check Failed";
    case "auth/code-expired":
      return "Code Expired";
    case "auth/cordova-not-ready":
      return "Cordova Not Ready";
    case "auth/cors-unsupported":
      return "CORS Unsupported";
    case "auth/credential-already-in-use":
      return "Credential Already In Use";
    case "auth/custom-token-mismatch":
      return "Credential Mismatch";
    case "auth/requires-recent-login":
      return "Credential Too Old, Login Again";
    case "auth/dependent-sdk-initialized-before-auth":
      return "Dependent SDK Initialized Before Auth";
    case "auth/dynamic-link-not-activated":
      return "Dynamic Link Not Activated";
    case "auth/email-change-needs-verification":
      return "Email Change Needs Verification";
    case "auth/email-already-in-use":
      return "Email Already In Use";
    case "auth/emulator-config-failed":
      return "Emulator Config Failed";
    case "auth/expired-action-code":
      return "Expired OOB Code";
    case "auth/cancelled-popup-request":
      return "Expired Popup Request";
    case "auth/internal-error":
      return "Internal Error";
    case "auth/invalid-api-key":
      return "Invalid API Key";
    case "auth/invalid-app-credential":
      return "Invalid App Credential";
    case "auth/invalid-app-id":
      return "Invalid App ID";
    case "auth/invalid-user-token":
      return "Invalid Auth";
    case "auth/invalid-auth-event":
      return "Invalid Auth Event";
    case "auth/invalid-cert-hash":
      return "Invalid Cert Hash";
    case "auth/invalid-verification-code":
      return "Invalid Code";
    case "auth/invalid-continue-uri":
      return "Invalid Continue URI";
    case "auth/invalid-cordova-configuration":
      return "Invalid Cordova Configuration";
    case "auth/invalid-custom-token":
      return "Invalid Custom Token";
    case "auth/invalid-dynamic-link-domain":
      return "Invalid Dynamic Link Domain";
    case "auth/invalid-email":
      return "Invalid Email";
    case "auth/invalid-emulator-scheme":
      return "Invalid Emulator Scheme";
    case "auth/invalid-credential":
      return "Invalid IDP Response / Invalid Login Credentials";
    case "auth/invalid-message-payload":
      return "Invalid Message Payload";
    case "auth/invalid-multi-factor-session":
      return "Invalid MFA Session";
    case "auth/invalid-oauth-client-id":
      return "Invalid OAuth Client ID";
    case "auth/invalid-oauth-provider":
      return "Invalid OAuth Provider";
    case "auth/invalid-action-code":
      return "Invalid OOB Code";
    case "auth/unauthorized-domain":
      return "Invalid Origin";
    case "auth/wrong-password":
      return "Invalid Password";
    case "auth/invalid-persistence-type":
      return "Invalid Persistence";
    case "auth/invalid-phone-number":
      return "Invalid Phone Number";
    case "auth/invalid-provider-id":
      return "Invalid Provider ID";
    case "auth/invalid-recaptcha-action":
      return "Invalid Recaptcha Action";
    case "auth/invalid-recaptcha-token":
      return "Invalid Recaptcha Token";
    case "auth/invalid-recaptcha-version":
      return "Invalid Recaptcha Version";
    case "auth/invalid-recipient-email":
      return "Invalid Recipient Email";
    case "auth/invalid-req-type":
      return "Invalid Req Type";
    case "auth/invalid-sender":
      return "Invalid Sender";
    case "auth/invalid-verification-id":
      return "Invalid Session Info";
    case "auth/invalid-tenant-id":
      return "Invalid Tenant ID";
    case "auth/multi-factor-info-not-found":
      return "MFA Info Not Found";
    case "auth/multi-factor-auth-required":
      return "MFA Required";
    case "auth/missing-android-pkg-name":
      return "Missing Android Package Name";
    case "auth/missing-app-credential":
      return "Missing App Credential";
    case "auth/auth-domain-config-required":
      return "Missing Auth Domain";
    case "auth/missing-client-type":
      return "Missing Client Type";
    case "auth/missing-verification-code":
      return "Missing Code";
    case "auth/missing-continue-uri":
      return "Missing Continue URI";
    case "auth/missing-iframe-start":
      return "Missing Iframe Start";
    case "auth/missing-ios-bundle-id":
      return "Missing iOS Bundle ID";
    case "auth/missing-multi-factor-info":
      return "Missing MFA Info";
    case "auth/missing-multi-factor-session":
      return "Missing MFA Session";
    case "auth/missing-or-invalid-nonce":
      return "Missing or Invalid Nonce";
    case "auth/missing-phone-number":
      return "Missing Phone Number";
    case "auth/missing-recaptcha-token":
      return "Missing Recaptcha Token";
    case "auth/missing-recaptcha-version":
      return "Missing Recaptcha Version";
    case "auth/missing-verification-id":
      return "Missing Session Info";
    case "auth/app-deleted":
      return "Module Destroyed";
    case "auth/account-exists-with-different-credential":
      return "Need Confirmation";
    case "auth/network-request-failed":
      return "Network Request Failed";
    case "auth/no-auth-event":
      return "No Auth Event";
    case "auth/no-such-provider":
      return "No Such Provider";
    case "auth/null-user":
      return "Null User";
    case "auth/operation-not-allowed":
      return "Operation Not Allowed";
    case "auth/operation-not-supported-in-this-environment":
      return "Operation Not Supported";
    case "auth/popup-blocked":
      return "Popup Blocked";
    case "auth/popup-closed-by-user":
      return "Popup Closed By User";
    case "auth/provider-already-linked":
      return "Provider Already Linked";
    case "auth/quota-exceeded":
      return "Quota Exceeded";
    case "auth/recaptcha-not-enabled":
      return "Recaptcha Not Enabled";
    case "auth/redirect-cancelled-by-user":
      return "Redirect Cancelled By User";
    case "auth/redirect-operation-pending":
      return "Redirect Operation Pending";
    case "auth/rejected-credential":
      return "Rejected Credential";
    case "auth/second-factor-already-in-use":
      return "Second Factor Already Enrolled";
    case "auth/maximum-second-factor-count-exceeded":
      return "Second Factor Limit Exceeded";
    case "auth/tenant-id-mismatch":
      return "Tenant ID Mismatch";
    case "auth/timeout":
      return "Timeout";
    case "auth/user-token-expired":
      return "Token Expired";
    case "auth/too-many-requests":
      return "Too Many Attempts, Try Later";
    case "auth/unauthorized-continue-uri":
      return "Unauthorized Domain";
    case "auth/unsupported-first-factor":
      return "Unsupported First Factor";
    case "auth/unsupported-persistence-type":
      return "Unsupported Persistence";
    case "auth/unsupported-tenant-operation":
      return "Unsupported Tenant Operation";
    case "auth/unverified-email":
      return "Unverified Email";
    case "auth/user-cancelled":
      return "User Cancelled";
    case "auth/user-not-found":
      return "User Not Found";
    case "auth/user-disabled":
      return "User Disabled";
    case "auth/user-mismatch":
      return "User Mismatch";
    case "auth/user-signed-out":
      return "User Signed Out";
    case "auth/weak-password":
      return "Weak Password";
    case "auth/web-storage-unsupported":
      return "Web Storage Unsupported";
    default:
      return "Unknown Error";
  }
}


// to clear redux data 

export const clearReduxData = () => {
  resetCat()
  resetCheckNews()
  resetPermission()
  resetTheme()
  resetCreateNews()
  resetFeatureLayout()
  resetLanguage()
  resetMorePages()
  resetNews()
  resetNotificationBadge()
  resetSettings()
  resetTemp()
  logoutUser()
}

export function clearCookies() {
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    const cookie = cookies[i];
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
    document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/";
  }
}

export async function clearCache() {
  const cacheNames = await caches.keys();
  for (const cacheName of cacheNames) {
    await caches.delete(cacheName);
  }
}

export function clearLocalStorage() {
  localStorage.clear();
}

export function clearSessionStorage() {
  sessionStorage.clear();
}

export async function clearCacheAndCookies() {
  clearCookies();
  await clearCache();
  clearLocalStorage();
  clearSessionStorage();
}

export const clearAllSiteData = () => {
  clearReduxData()
  clearCacheAndCookies()
}







