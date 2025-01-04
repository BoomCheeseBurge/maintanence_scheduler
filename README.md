# Maintenance Scheduler

## Built on PHP 8 with Bootstrap5.

This project was part of an internship task to manage the maintanence schedule for employees in the technical support department where users can track and manage their upcoming, in-progress, or finished maintenances.

This project was developed with PHP using MariaDB RDBMS (MySQL database) and Apache2 webserver (in XAMPP).

Fresh project installation welcomes the admin user with a pre-flight & setup page to configure their email, password, and personal information.

The MVC principles are applied to provide ease of navigation through the projet folder for maintainability and scalability. 

## Roles

1. Admin User

2. Manager User

3. Engineer User

Any finished maintenances are archived in the maintenance history section.

## Web-Application Sections

The project consist of the following sections based on the user role's POV:

* Dashboard

__Admin and manager users__ are able to view a table that displays the on-going maintenance scheduled ONLY for the current month.

__Manager users__ are able to view and track which users are late on their maintenance based on month or year from user input (by default the current month or year), that is visualized with a simple bar graph.

__Engineer users__ ONLY has access to this page to keep track of their scheduled maintenances.

__Engineer users__ can perform actions on every row to change the status of the on-going maintenance from scheduled date (available maintenance date set by the engineer), actual date (agreed schedule date between the engineer and the client), maintenance status (in-progress or finished), and report status (on which date the maintenance report was delivered).

* __Maintenance__

__Admin and manager users__ are able to view a table that displays a history of past maintenance schedules.

__Admin and manager users__ are able to delete records if necessary (e.g., unused maintenance schedules).

* __Contract__

__Admin and manager users__ are able to view a table that displays the current contracts with existing clients.

__Admin users__ are able to perform CRUD operations for contract.

Additionally, __admin users__ can create a new maintenance schedule with respect to each contract.

* __Client__

__Admin and manager users__ are able to view a table that displays existing clients.

__Admin users__ are able to perform CRUD operations for client.

* __User__

__Admin and manager users__ are able to view a table that displays existing users.

__Admin users__ are able to perform CRUD operations for user.


* __User Navbar Menu__

__All users__ are able to access this menu to either modify their profile (i.e., name, email, or photo change) or change password.

However, __only admin users__ are able to change email and phone number support.

## Tables

The tables utilize a third-party library called __Bootstrap Table__. The table from the library by default provides table functionalities that would be seen in a typical table as follows.

* search table input.
* refresh table.
* show/hide columns.
* full screen view of the table.
* sortable columns.
* resizable columns.
* pagination.

Additional functionalities added to the table are a filter feature and downloadable table data for certain cases.

## Testing

Considering the relatively small size of the project and tight deadline, testing were performed manually that tests the common workflow of the web-application used by each user roles.

## Future Improvements

- [ ] :x: Perform proper testing using PHPUnit.

## Third-Party Libraries

These libraries were installed (with composer and NPM) to provide additional functionalities either to simplify creating web components or expand existing features. The following lists out the third-party libraries used in this project.

__NPM__

* Bootstrap Table ( 1.22.1 )
* Apache ECharts ( 5.4.3 )
* jquery-resizable-columns by __dobtco__ ( 0.2.3 ) [dependent on StoreJS and JQuery]
* StoreJS ( 2.0.0 )
* tableExport.jquery.plugin by __hhurz__ ( 1.28.0 )
* SweetAlert2 ( 11.7.23 )

__External Source__

* Bootstrap ( 5.3.0 )
* JQuery ( 3.7.0 )
  
