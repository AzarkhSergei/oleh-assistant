import React, { useState } from "react";
import { Building2, ShieldCheck, FileText, Banknote, Stethoscope } from "lucide-react";

export default function UsefulLinksPage() {
  type Office = {
    city: string;
    address: string;
    phone: string;
    hours: string;
  };

  type Company = {
    name: string;
    offices: Office[];
  };

  type Department = {
    name: string;
    icon: React.JSX.Element;
    offices?: Office[];
    companies?: Company[];
  };

  const departments: Department[] = [
    {
      name: "Министерство алии и интеграции",
      icon: <Building2 className="text-primary" />,
      offices: [
        { city: "Ашкелон", address: "ул. Бен-Гурион 1", phone: "08-6701000", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Беэр-Шева", address: "ул. Шазар 31", phone: "08-6261222", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Хайфа", address: "ул. Пальям 15а", phone: "04-8631111", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Герцлия", address: "ул. Аба Эвен 12", phone: "09-9514555", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Иерусалим", address: "ул. Кинг Джордж 33", phone: "02-6201222", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Нетания", address: "ул. Вайцман 6", phone: "09-8821111", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Реховот", address: "ул. Герцль 80", phone: "08-9392121", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Цфат", address: "ул. Арлозоров 10", phone: "04-6921000", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Тель-Авив", address: "ул. Саламе 53", phone: "03-7634400", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Тверия", address: "ул. Давидка 3", phone: "04-6731234", hours: "Вс–Чт: 08:00–16:00" },
        { city: "Зихрон-Яаков", address: "ул. Ротшильд 34", phone: "04-6398888", hours: "Вс–Чт: 08:00–16:00" }
      ]
    },
    {
      name: "МВД (Мишрад а-Пним)",
      icon: <ShieldCheck className="text-primary" />,
      offices: [
        { city: "Иерусалим", address: "ул. Шломо Амбар 1", phone: "02-6294666", hours: "Вс–Чт: 08:00–12:00" },
        { city: "Тель-Авив", address: "ул. Саламе 53", phone: "03-7634400", hours: "Вс–Чт: 08:00–12:00" },
        { city: "Хайфа", address: "ул. Пальям 15", phone: "04-8633333", hours: "Вс–Чт: 08:00–12:00" },
        { city: "Реховот", address: "ул. Герцль 80", phone: "08-9392121", hours: "Вс–Чт: 08:00–12:00" }
      ]
    },
    {
      name: "Битуах Леуми",
      icon: <FileText className="text-primary" />,
      offices: [
        { city: "Тель-Авив", address: "ул. Ицхак Садэ 17", phone: "*6050", hours: "Вс–Чт: 08:30–13:00" },
        { city: "Хайфа", address: "ул. Пальям 15", phone: "*6050", hours: "Вс–Чт: 08:30–13:00" },
        { city: "Беэр-Шева", address: "ул. Рамбам 6", phone: "*6050", hours: "Вс–Чт: 08:30–13:00" }
      ]
    },
    {
      name: "Налоговое управление",
      icon: <Banknote className="text-primary" />,
      offices: [
        { city: "Тель-Авив", address: "Дерех Менахем Бегин 125", phone: "03-7633333", hours: "Вс–Чт: 08:30–13:30" },
        { city: "Иерусалим", address: "ул. Канфи Нашарим 66", phone: "02-6669999", hours: "Вс–Чт: 08:30–13:30" },
        { city: "Хайфа", address: "ул. Пальям 15а", phone: "04-8654333", hours: "Вс–Чт: 08:30–13:30" }
      ]
    },
    {
      name: "Больничные кассы",
      icon: <Stethoscope className="text-primary" />,
      companies: [
        {
          name: "Клалит",
          offices: [
            { city: "Тель-Авив", address: "ул. Дизенгоф 155", phone: "*2700", hours: "Вс–Чт: 08:00–16:00" },
            { city: "Беэр-Шева", address: "ул. Рагозин 1", phone: "*2700", hours: "Вс–Чт: 08:00–16:00" },
            { city: "Хайфа", address: "ул. Моше Флиман 18", phone: "*2700", hours: "Вс–Чт: 08:00–16:00" }
          ]
        },
        {
          name: "Маккаби",
          offices: [
            { city: "Иерусалим", address: "ул. Яффо 216", phone: "*3555", hours: "Вс–Чт: 08:00–16:00" },
            { city: "Хайфа", address: "ул. Герцль 48", phone: "*3555", hours: "Вс–Чт: 08:00–16:00" }
          ]
        },
        {
          name: "Меухедет",
          offices: [
            { city: "Нетания", address: "ул. Га-Ацмаут 35", phone: "*3833", hours: "Вс–Чт: 08:00–16:00" },
            { city: "Рамат-Ган", address: "ул. Бен Гурион 18", phone: "*3833", hours: "Вс–Чт: 08:00–16:00" }
          ]
        },
        {
          name: "Леумит",
          offices: [
            { city: "Ашдод", address: "ул. Менахем Бегин 17", phone: "*507", hours: "Вс–Чт: 08:00–16:00" },
            { city: "Тверия", address: "ул. Давидка 2", phone: "*507", hours: "Вс–Чт: 08:00–16:00" }
          ]
        }
      ]
    }
  ];
  const [openSections, setOpenSections] = useState<Record<string, boolean>>({});
  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6 text-primary">Контактные данные ведомств</h1>
      <p className="text-gray-700 leading-relaxed mb-6">
        Здесь вы найдёте адреса, телефоны и часы работы ключевых учреждений Израиля.
      </p>
      <div className="space-y-4">
        {departments.map((dep) => (
          <div key={dep.name} className="bg-white border rounded">
            <button
              onClick={() => toggleSection(dep.name)}
              className="w-full text-left flex items-center gap-2 p-4 font-semibold text-lg text-primary border-b hover:bg-gray-50"
            >
              {dep.icon}
              {dep.name}
            </button>
            {openSections[dep.name] && (
              <div className="p-4 space-y-3">
                {Array.isArray(dep.offices) && dep.offices.length > 0 && (
                  dep.offices
                    .sort((a, b) => a.city.localeCompare(b.city, 'ru'))
                    .map((office) => (
                      <div key={`${dep.name}-${office.city}`} className="border p-3 rounded hover:shadow-sm transition">
                        <h3 className="font-semibold text-lg text-gray-800">{office.city}</h3>
                        <p className="text-sm text-gray-700">📍 {office.address}</p>
                        <p className="text-sm text-gray-700">📞 {office.phone}</p>
                        <p className="text-sm text-gray-700">🕒 {office.hours}</p>
                      </div>
                    ))
                )}

                {Array.isArray(dep.companies) && dep.companies.length > 0 && (
                  dep.companies.map((company) => (
                    <div key={company.name} className="border rounded">
                      <button
                        onClick={() => toggleSection(`${dep.name}-${company.name}`)}
                        className="w-full text-left p-3 font-semibold text-gray-700 border-b bg-gray-50 hover:bg-gray-100"
                      >
                        {company.name}
                      </button>
                      {openSections[`${dep.name}-${company.name}`] && (
                        <div className="p-3 space-y-3">
                          {company.offices.length > 0 ? (
                            company.offices
                              .sort((a, b) => a.city.localeCompare(b.city, 'ru'))
                              .map((office) => (
                                <div key={`${company.name}-${office.city}`} className="border p-3 rounded hover:shadow-sm transition">
                                  <h4 className="font-semibold text-md text-gray-800">{office.city}</h4>
                                  <p className="text-sm text-gray-700">📍 {office.address}</p>
                                  <p className="text-sm text-gray-700">📞 {office.phone}</p>
                                  <p className="text-sm text-gray-700">🕒 {office.hours}</p>
                                </div>
                              ))
                          ) : (
                            <p className="text-gray-500">Нет доступной информации по городам.</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))
                )}

                {!dep.offices && !dep.companies && (
                  <p className="text-gray-500">Нет доступной информации.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
