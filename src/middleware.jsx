
import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
 const path=request.nextUrl.pathname;

 var ispublicPath = path ==='/login' || path ==='/register';
 var token = request.cookies.get('token')?.value || '';


console.log(path)
 console.log(config.matcher.some( (element) => element === path ))
// console.log(ispublicPath+'--'+config.matcher[0]+'--'+token )

  if (path==='/'&& token )
  { 

  return NextResponse.redirect(new URL('/dashboard', request.nextUrl));
  
  }



 if (ispublicPath && token )
{ 
  console.log('1..............', path)
return NextResponse.redirect(new URL('/new', request.nextUrl));

}



if (!ispublicPath && !token  )
    { console.log('33..............', path)
    return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [ '/login', '/new', '/register', '/dashboard',  '/', '/([a-zA-Z0-9-_]+)']
}


//'/about/:path*'  '/',








// && config1.matcher.some( (element) => element === '/login' )