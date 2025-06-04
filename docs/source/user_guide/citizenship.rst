Good Cluster Citizenship
============================

**You share Delta with thousands of other users.** 
What you do on the system affects others. 
Exercise good citizenship to ensure your activity does not adversely impact the system and the research community with whom you share it. 
Here are some rules of thumb:

-  Do not run production applications on the login nodes (very short time debug tests are fine).
-  Do not stress file systems with known-harmful access patterns (many thousands of small files in a single directory).
-  If you encounter an issue, :ref:`submit an informative support request <help>`; include the loaded modules (module list) and stdout/stderr messages in your email.

Acceptable Use Policies
-------------------------

As a Delta user, you agree to follow these acceptable/appropriate use policies:

- `NCSA Acceptable Use Policy <https://wiki.ncsa.illinois.edu/display/cybersec/NCSA+Acceptable+Use+Policy>`_
- `ACCESS Acceptable Use Policy <https://access-ci.org/acceptable-use/>`_
- `University of Illinois Appropriate Use of Computers and Network Systems Policy <https://cam.illinois.edu/policies/fo-07/>`_

Login Node Process Restriction
---------------------------------

We prefer that users self-restrict what they run on the login nodes, as explained above on this page.  Some production processes still get run on the login nodes for whatever reason.  This causes problems by using up I/O slots, RAM, and processor cores on the login nodes. As a result, we have implemented automatic safeguard scripts that stop codes that appear to be applications running on the login nodes.  

If have a code running on the logins and it suddenly stops, look for an email of this format.  If you don't understand why your process was killed, please :ref:`send in a ticket <help>`; and we'll be happy to sit down and talk to you.  
