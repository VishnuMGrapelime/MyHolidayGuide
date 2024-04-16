export default function DashboardSidebarLayout({ children }: {
   children: React.ReactNode;
}) {

   return (
      <div>

         <div className="p-2 sm:ml-12">
            {children}
         </div>
      </div>
   );
}
