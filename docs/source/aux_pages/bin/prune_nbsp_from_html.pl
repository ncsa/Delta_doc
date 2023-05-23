#!/usr/bin/perl

# print "perl is running!\n";

$input_file=$ARGV[0];
$output_file=$ARGV[1];

print "input = $input_file\n";
print "output = $output_file\n";

open INFILE,"<".$input_file or die "could not open $input_file for reading!\n";

if($output_file){
    open OUTFILE,">".$output_file or die "could not open $output_file for output!\n";
}

# <ac:structured-macro 
# <![CDATA[

# ]]></ac:plain-text-body></ac:structured-macro>

$total=0;
while(<INFILE>){
    $print_generic=1;
    if(s/&nbsp;/ /g){
	print "space!\n";
	$print_generic=0;
	$total++;
	if($output_file){
	    print OUTFILE $_;
	}
    }
#    if(s/&#39;/'/g){
#	print "apostrophe!\n";
#	$print_generic=0;
#	if($output_file)    
#	    print OUTFILE $_;
#    }
    if($print_generic == 1){
	if($output_file){
	    print OUTFILE $_;
	}
    }
}
print "total spaces found: $total\n";
