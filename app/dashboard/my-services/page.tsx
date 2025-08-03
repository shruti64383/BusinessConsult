"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Service {
  _id: string;
  serviceName: string;
  status: string;
  requestedAt: string;
}

export default function MyServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/services/my", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setServices(res.data);
      } catch (err) {
        console.error("Error fetching services:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">📄 My Services</h1>

      {loading ? (
        <p>Loading services...</p>
      ) : services.length === 0 ? (
        <p>No services requested yet.</p>
      ) : (
        <ul className="space-y-4">
          {services.map((service) => (
            <li
              key={service._id}
              className="p-4 border rounded shadow flex justify-between items-center"
            >
              <div>
                <h2 className="font-semibold">{service.serviceName}</h2>
                <p className="text-sm text-gray-500">
                  Requested on: {new Date(service.requestedAt).toLocaleDateString()}
                </p>
              </div>
              <span
                className={`px-3 py-1 rounded text-sm font-medium ${
                  service.status === "approved"
                    ? "bg-green-100 text-green-700"
                    : service.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {service.status}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
