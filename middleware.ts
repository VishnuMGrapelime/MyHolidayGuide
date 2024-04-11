import acceptLanguage from 'accept-language';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

import { cookieName, fallbackLng, languages } from './src/app/i18n/settings';

acceptLanguage.languages(languages);

export const config = {
  // matcher: '/:lng*'
  matcher: [
    '/((?!api|_next/static|_next/image|assets|favicon|favicon.ico|sw.js).*)',
  ],
};

export async function middleware(req: NextRequest) {
  // console.log('middleware working');

  // let lng;
  // if (req.cookies.has(cookieName))
  //   lng = acceptLanguage.get(req.cookies.get(cookieName).value);
  // if (!lng) lng = acceptLanguage.get(req.headers.get('Accept-Language'));
  // if (!lng) lng = fallbackLng;

  let lng;

  if (req.cookies.has(cookieName)) {
    const cookie = req.cookies.get(cookieName);
    if (cookie !== undefined) {
      lng = acceptLanguage.get(cookie.value);
    }
  }

  if (!lng) {
    const acceptLanguageHeader = req.headers.get('Accept-Language');
    if (acceptLanguageHeader !== null) {
      lng = acceptLanguage.get(acceptLanguageHeader);
    }
  }

  if (!lng) {
    lng = fallbackLng;
  }


  // Redirect if lng in path is not supported
  if (
    !languages.some((loc) => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(
      new URL(`/${lng}${req.nextUrl.pathname}`, req.url),
    );
  }

  // if (req.headers.has('referer')) {
  //   const refererUrl = new URL(req.headers.get('referer'));
  //   const lngInReferer = languages.find((l) =>
  //     refererUrl.pathname.startsWith(`/${l}`),
  //   );
  //   const response = NextResponse.next();
  //   if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
  //   return response;
  // }

  if (req.headers.has('referer')) {
    const refererHeaderValue = req.headers.get('referer');
    if (refererHeaderValue !== null) {
      const refererUrl = new URL(refererHeaderValue);
      const lngInReferer = languages.find((l) =>
        refererUrl.pathname.startsWith(`/${l}`),
      );
      const response = NextResponse.next();
      if (lngInReferer) response.cookies.set(cookieName, lngInReferer);
      return response;
    }
  }

  // const session = await getSession({ req: req });
  // console.log("Middleware section working");
  // if(session){
  //     return NextResponse.redirect('/signin')
  // }
}
