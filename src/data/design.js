// Some USD notes printed with different series year share the same design and 
// security features. designYears holds each note value as the keys and their
// corresponding series years mapped to the year the design was issued at as the
// values.
const designYears = {
	"100": {
		"2017": "2013",
		"2013": "2013",
		"2009A": "2013",
		"2009": "2013",
		"2006A": "1996",
		"2006": "1996",
		"2003A": "1996",
		"2003": "1996",
		"2001": "1996",
		"1999": "1996",
		"1996": "1996",
		"1993": "1990",
		"1990": "1990",
		"1988": "1929",
		"1985": "1929",
		"1981A": "1929",
		"1981": "1929",
		"1977": "1929",
		"1974": "1929",
		"1969D": "1929",
		"1969C": "1929",
		"1969B": "1929",
		"1969": "1929",
		"1963A": "1929"
	}, "50": {
		"2017": "2004",
		"2013": "2004",
		"2009": "2004",
		"2006": "2004",
		"2004A": "2004",
		"2004": "2004",
		"2001": "1997",
		"1996": "1997",
		"1993": "1990",
		"1990": "1990",
		"1988": "1929",
		"1981A": "1929",
		"1981": "1929",
		"1977": "1929",
		"1974": "1929",
		"1969D": "1929",
		"1969C": "1929",
		"1969B": "1929",
		"1969": "1929",
		"1963A": "1929"
	}, "20": {
		"2017A": "2003",
		"2017": "2003",
		"2013": "2003",
		"2009": "2003",
		"2006": "2003",
		"2004A": "2003",
		"2004": "2003",
		"2001": "1998",
		"1999": "1998",
		"1996": "1998",
		"1995": "1990",
		"1993": "1990",
		"1990": "1990",
		"1988A": "1929",
		"1985": "1929",
		"1981A": "1929",
		"1981": "1929",
		"1977": "1929",
		"1974": "1929",
		"1969D": "1929",
		"1969C": "1929",
		"1969A": "1929",
		"1969": "1929",
		"1963A": "1929",
		"1963": "1929"
	}, "10": {
		"2017": "2006",
		"2013": "2006",
		"2009": "2006",
		"2006": "2006",
		"2004A": "2006",
		"2003": "2000",
		"2001": "2000",
		"1999": "2000",
		"1995": "1990",
		"1993": "1990",
		"1990": "1990",
		"1988A": "1929",
		"1981A": "1929",
		"1981": "1929",
		"1977A": "1929",
		"1977": "1929",
		"1974": "1929",
		"1969D": "1929",
		"1969C": "1929",
		"1969B": "1929",
		"1969": "1929",
		"1963A": "1929",
		"1963": "1929"
	}, "5": {
		"2017": "2008",
		"2013": "2008",
		"2009": "2008",
		"2006": "2008",
		"2003A": "2000",
		"2003": "2000",
		"2001": "2000",
		"1999": "1993",
		"1995": "1993",
		"1993": "1993",
		"1988A": "1929",
		"1988": "1929",
		"1985": "1929",
		"1981A": "1929",
		"1981": "1929",
		"1977A": "1929",
		"1977": "1929",
		"1974": "1929",
		"1969C": "1929",
		"1969B": "1929",
		"1969A": "1929",
		"1969": "1929",
		"1963A": "1929",
		"1963": "1929"
	}, "2": {
		"2017A": "1976",
		"2013": "1976",
		"2009": "1976",
		"2003A": "1976",
		"2003": "1976",
		"1995": "1976",
		"1976": "1976"
	}, "1": {
		"2017": "1963",
		"2013": "1963",
		"2009": "1963",
		"2006": "1963",
		"2003A": "1963",
		"2003": "1963",
		"2001": "1963",
		"1999": "1963",
		"1995": "1963",
		"1993": "1963",
		"1988A": "1963",
		"1988": "1963",
		"1985": "1963",
		"1981A": "1963",
		"1981": "1963",
		"1977A": "1963",
		"1977": "1963",
		"1974": "1963",
		"1969D": "1963",
		"1969C": "1963",
		"1969B": "1963",
		"1969A": "1963",
		"1969": "1963",
		"1963B": "1963",
		"1963A": "1963",
		"1963": "1963"
	}
};
export default designYears;