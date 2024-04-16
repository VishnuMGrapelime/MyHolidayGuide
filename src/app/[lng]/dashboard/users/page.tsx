"use client";
import { SideMenuNew } from "@/components/Admin/SideMenu/SideMenuNew";
import UsersList from "@/components/Users/UsersList";
import React, { useState } from "react";

interface Params {
  lng: string;
}
export default function Page({ params: { lng } }: { params: Params }) {

  return (
    <div className="flex w-full">
      <SideMenuNew />
      <div className="w-4/5 bg-white mr-1 mt-4">
        <h1 className="text-2xl font-bold pb-8">Suppliers List</h1>

        <UsersList lang={lng} itemName='Users' itemAddUrl="/admin/beaches/add-beach" itemEditUrl="/admin/beaches" itemCatName="user" />

      </div>
    </div>

  );

}
