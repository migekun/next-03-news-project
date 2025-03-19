import { NextResponse } from "next/server";

export function middleware(request)  {
  console.log(request);
  //es un filtro para las todas las peticiones a la web
  return NextResponse.next()
}

export const config = {
    matcher: '/news/'
}