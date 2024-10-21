"use client"
import React, { useState, useEffect } from 'react';
import { ChevronRight } from 'lucide-react';

const BreadCrumb = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<any>([]);

  useEffect(() => {
    const path = window.location.pathname;
    const parts = path.split('/').filter(Boolean);

    if (parts.length === 0) {
      setBreadcrumbs([]);
    } else if (parts.length === 1) {
      setBreadcrumbs([parts[0]]);
    } else {
      // Check if the last part is a number or a long string (likely an ID)
      const lastPart:any = parts[parts.length - 1];
      if (!isNaN(lastPart) || lastPart.length > 20) {
        parts.pop();
      }
      setBreadcrumbs(parts);
    }
  }, []);

  if (breadcrumbs.length === 0) {
    return null; // Don't render anything if there are no breadcrumbs
  }

  return (
    <div className="flex items-center text-sm text-gray-600">
      {breadcrumbs.map((crumb:string, index:number) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="mx-2" size={16} />}
          <a 
            href={`/${breadcrumbs.slice(0, index + 1).join('/')}`} 
            className="hover:text-blue-600 capitalize"
          >
            {crumb}
          </a>
        </React.Fragment>
      ))}
    </div>
  );
};

export default BreadCrumb;