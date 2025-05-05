# Dokument wymagań produktu (PRD) - 10x-cards

## 1. Przegląd produktu

10x-cards to webowa aplikacja do szybkiego tworzenia i zarządzania fiszkami edukacyjnymi z wykorzystaniem sztucznej inteligencji. Celem MVP jest umożliwienie użytkownikom generowania propozycji fiszek na podstawie wklejonych notatek (do 10 000 znaków), ręcznego tworzenia fiszek, przeglądania i edycji oraz integracja z gotowym algorytmem powtórek. System oferuje jedną rolę użytkownika, podstawowe zabezpieczenie HTTPS oraz prostą bazę utrzymującą zestawy fiszek.

## 2. Problem użytkownika

Tworzenie wysokiej jakości fiszek metodą spaced repetition jest skuteczne, jednak ręczne przygotowanie fiszek jest czasochłonne i często zniechęca do regularnej nauki. Użytkownicy potrzebują narzędzia, które automatycznie wygeneruje propozycje fiszek z ich materiałów i pozwoli szybko je zaakceptować lub edytować.

## 3. Wymagania funkcjonalne

1. Generowanie propozycji fiszek przez AI
   • przyjmowanie wklejonego tekstu (PL/EN) o długości do 10 000 znaków
   • walidacja limitu znaków i komunikat o przekroczeniu
   • prezentacja kandydatów na fiszki z przyciskami Akceptuj / Edytuj / Odrzuć

2. Ręczne tworzenie fiszek
   • modal z formularzem „przód” / „tył”
   • walidacja pól (niepuste)
   • zapis do bazy

3. Przeglądanie i zarządzanie fiszkami
   • lista wszystkich zaakceptowanych fiszek
   • edycja i usuwanie istniejących fiszek
   • natychmiastowe odświeżenie listy po operacji

4. System kont użytkowników
   • rejestracja i logowanie przez email/hasło
   • zmiana hasła
   • usunięcie konta
   • wylogowanie

5. Integracja z open-source’owym algorytmem powtórek
   • zapis parametrów powtórek w bazie
   • przypisanie fiszek do harmonogramu powtórek

6. Bezpieczeństwo i infrastruktura
   • HTTPS dla wszystkich żądań
   • architektura: serwer aplikacji + AI API, z możliwością skalowania

   • Dane użytkowników i fiszek przechowywane zgodnie z RODO

7.  Statystyki generowania fiszek

   • Zbieranie statystyk ile fiszek zostało wygenerowanych przez AI a ile z nich ostatecznie zaakceptowano

## 4. Granice produktu

• brak własnego, zaawansowanego algorytmu powtórek (korzystamy z biblioteki open-source)
• brak importu plików (PDF, DOCX itp.)
• brak współdzielenia zestawów między użytkownikami
• brak integracji z zewnętrznymi platformami edukacyjnymi
• brak aplikacji mobilnych (tylko web)
• jedna rola użytkownika, brak panelu administracyjnego

## 5. Historyjki użytkowników

US-001
Tytuł: Rejestracja nowego użytkownika
Opis: Jako nowy użytkownik chcę się zarejestrować kontem email/hasło, aby mieć dostęp do swoich fiszek.
Kryteria akceptacji:

* formularz z polami email i hasło
* walidacja formatu email i minimalnej długości hasła (8 znaków)
* po rejestracji automatyczne zalogowanie i przekierowanie do pulpitu

US-002
Tytuł: Logowanie
Opis: Jako zarejestrowany użytkownik chcę się zalogować, aby uzyskać dostęp do aplikacji.
Kryteria akceptacji:

* formularz z email i hasłem
* wyświetlenie błędu przy nieprawidłowych danych
* udane logowanie prowadzi do listy fiszek

US-003
Tytuł: Zmiana hasła
Opis: Jako zalogowany użytkownik chcę zmienić swoje hasło, aby zabezpieczyć konto.
Kryteria akceptacji:

* formularz z aktualnym hasłem, nowym i potwierdzeniem
* walidacja zgodności i siły nowego hasła
* komunikat o pomyślnej zmianie

US-004
Tytuł: Usunięcie konta
Opis: Jako zalogowany użytkownik chcę usunąć swoje konto, aby pozbyć się danych.
Kryteria akceptacji:

* potwierdzenie operacji (modal)
* usunięcie wszystkich danych użytkownika
* przekierowanie do strony rejestracji

US-005
Tytuł: Wklejenie tekstu i generowanie fiszek AI
Opis: Jako użytkownik chcę wkleić notatki (≤10 000 znaków), aby AI wygenerowało propozycje fiszek.
Kryteria akceptacji:

* walidacja limitu znaków z komunikatem o przekroczeniu
* przyciemniony przycisk „Generuj” do czasu wprowadzenia tekstu
* wyświetlenie listy kandydatów na fiszki po zakończeniu generacji

US-006
Tytuł: Recenzja propozycji AI
Opis: Jako użytkownik chcę zobaczyć propozycje fiszek od AI i wybrać, które zaakceptować, edytować lub odrzucić.
Kryteria akceptacji:

* dla każdej propozycji przyciski Akceptuj, Edytuj, Odrzuć
* Akceptuj: zapis fiszki i usunięcie z widoku kandydatów
* Edytuj: otwiera edytor inline, po zapisie przemieszcza do listy fiszek
* Odrzuć: usuwa propozycję bez zapisu

US-007
Tytuł: Ręczne utworzenie fiszki
Opis: Jako użytkownik chcę ręcznie dodać fiszkę przez modal z polami front/back.
Kryteria akceptacji:

* dostępny przycisk „Utwórz nową fiszkę” na liście
* walidacja niepustych pól
* zapis i wyświetlenie nowej fiszki na liście

US-008
Tytuł: Przegląd listy fiszek
Opis: Jako użytkownik chcę zobaczyć wszystkie zapisane fiszki w jednolitym widoku listy.
Kryteria akceptacji:

* lista pokazuje front i skrót notatki tyłu
* sortowanie od najnowszych
* paginacja lub lazy-loading przy dużej liczbie fiszek
* użytkownik widzi tylko swoje fiszki, nie ma dostępu do fiszek innych użytkowników

US-009
Tytuł: Edycja istniejącej fiszki
Opis: Jako użytkownik chcę edytować front lub tył już zapisanej fiszki.
Kryteria akceptacji:

* przycisk „Edytuj” przy każdej fiszce
* modal z wypełnionymi polami front/back
* zapis zmian i odświeżenie listy

US-010
Tytuł: Usunięcie fiszki
Opis: Jako użytkownik chcę usunąć fiszkę, aby oczyścić listę.
Kryteria akceptacji:

* przycisk „Usuń” przy każdej fiszce
* potwierdzenie w modalu
* usunięcie z bazy i odświeżenie listy

US-011
Tytuł: Obsługa błędu generacji AI
Opis: Jako użytkownik chcę zobaczyć komunikat o błędzie, gdy generacja fiszek AI nie powiedzie się.
Kryteria akceptacji:

* komunikat „Wystąpił błąd generowania fiszek. Spróbuj ponownie.”
* przycisk „Spróbuj ponownie”

US-012
Tytuł: Walidacja tekstu wejściowego
Opis: Jako użytkownik chcę być poinformowany, gdy wklejony tekst jest pusty lub za długi.
Kryteria akceptacji:

* komunikat „Wprowadź tekst” dla pustego pola
* komunikat „Maksymalnie 10 000 znaków” przy przekroczeniu

US-013
Tytuł: Sesja nauki z algorytmem powtórek
Opis: Jako użytkownik chcę, aby zaakceptowane fiszki były uwzględniane w harmonogramie powtórek w widoku "Nauka" opartym na zewnętrznym algorytmie, aby móc efektywnie się uczyć (spaced repetition).
Kryteria akceptacji:

* W widoku "Nauka" algorytm przygotowuje sesję nauki fiszek
* Wyświetlany jest przód fiszkim, po kliknięcie w fiszkę przez użytkownika pojawią tył fiszki
* Użytkownik ocenia zgodnie z oczekiwaniami algorytmu na ile przyswoił fiszkę
* Następnie algorytm pokazuje kolejną fiszkę do nauki

US-014
Tytuł: Wylogowanie
Opis: Jako zalogowany użytkownik chcę się wylogować, aby zakończyć sesję.
Kryteria akceptacji:

* przycisk „Wyloguj” w nagłówku
* przekierowanie do strony logowania

## 6. Metryki sukcesu

1. 75 % wygenerowanych przez AI fiszek zostaje zaakceptowanych przez użytkowników
2. 75 % wszystkich tworzonych fiszek pochodzi z generacji AI
3. Monitorowania liczby wygenerowanych fiszek i porównanie z liczbą zatwierdzonych
