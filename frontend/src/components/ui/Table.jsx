import React from "react";

export default function Table({ headers, children }) {
    return (
        <div className="overflow-x-auto bg-white rounded-lg shadow border border-slate-200">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-slate-50 border-b border-slate-200">
                        {headers.map((header, index) => (
                            <th
                                key={index}
                                className="px-6 py-4 text-xs font-semibold text-slate-500 uppercase tracking-wider"
                            >
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                    {children}
                </tbody>
            </table>
        </div>
    );
}

export function TableRow({ children, className = "" }) {
    return (
        <tr className={`hover:bg-slate-50 transition-colors ${className}`}>
            {children}
        </tr>
    );
}

export function TableCell({ children, className = "" }) {
    return (
        <td className={`px-6 py-4 text-sm text-slate-700 ${className}`}>
            {children}
        </td>
    );
}
