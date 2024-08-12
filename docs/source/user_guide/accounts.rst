Account Administration
========================

.. _mgmt_tools:

Management Tools
-----------------

ACCESS projects use the `ACCESS user portal <https://support.access-ci.org/>`_ for project and account management.

Non-ACCESS project and account management, such as adding someone to a project, is handled by NCSA Identity and NCSA group management tools. For more information, see the `NCSA Allocation and Account Management <https://wiki.ncsa.illinois.edu/display/USSPPRT/NCSA+Allocation+and+Account+Management>`_ page.

Configuring Your Account
----------------------------

Bash is the default shell. To change the default shell, :ref:`submit a support request <help>`.

If you use bash a lot directly (if you ssh into the login nodes to edit files and run jobs), there are many useful customizations you can install in the file called ".bashrc" in your home directory.  The bash shell loads this file every time it starts.  You can, for instance, load modules that you always want loaded in this file.  Here useful guide to bash customization: XXXXXX.  

We do *not* generally recommend loading complex environments in your .bashrc (like python, conda, and the like).  In particular, try never to run "conda install"; that sets up conda (via your .bashrc file) to always load.  Loading those kinds of environments takes time, pulls (often many, large) files from the parallel file systems, and generally makes it much more difficult to debug login problems.  

Allocations
-------------

The majority of Delta is allocated through ACCESS and is the preferred path to getting compute time on Delta. A portion of the Delta system is also available to Illinois researchers, primarily to fill needs not met by the ACCESS program. See the `Delta Allocations <https://delta.ncsa.illinois.edu/delta-allocations/>`_ page to learn more, including how to submit allocation requests.

Allocation Policies
-----------------------

ACCESS awarded projects and allocations should receive periodic messages regarding approaching project expiration.

- An ACCESS project is marked for inactivation once it has no valid resource allocation on the system.
- Current ACCESS policy is for user access to be removed if a user is not a member of any *active* project on Delta.
- Delta does NOT allow storage only allocations, all user accounts must be on an active compute resource allocation. All Delta storage resources are intended for data in active use. Delta does not provide storage resources for archiving data or other long-term storage.

Illinois awarded projects and allocations currently *do not* receive periodic messages regarding approaching project expiration.

- Manual notifications are being provided, as needed.
- The Delta Project office is working on a process for notifications, and project and account inactivation based on expiration dates.

There is a 30-day grace period for expired Delta projects to allow for data management access only.

.. _all_sup:

Allocation Supplements and Extensions
---------------------------------------

Request resource allocation supplements (compute, GPU, or storage) and extensions via the appropriate XRAS website.

- ACCESS allocation PIs can find instructions on the `ACCESS Allocations: How To <https://allocations.access-ci.org/how-to>`_ page.
- NCSA allocation PIs can find instructions on the `Delta Allocations <https://wiki.ncsa.illinois.edu/display/USSPPRT/Delta+Allocations#DeltaAllocations-Requestingan%22Extension%22or%22Supplement%22foranexistingDeltaallocation>`_ page.
