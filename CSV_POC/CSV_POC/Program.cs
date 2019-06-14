using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CSV_POC
{
    class Program
    {
        static void Main(string[] args)
        {
            string filepath = "people.csv";

            List<Person> people = new List<Person>
            {
                new Person
                {
                    Id = 1,
                    Name = "Mario",
                    Surname = "Rossi",
                    Email = "mario.rossi@yourmail.com"
                },
                new Person
                {
                    Id = 2,
                    Name = "Luigi",
                    Surname = "Verdi",
                    Email = "luigi.verdi@yourmail.com"
                }
            };

            IEnumerable<string> strings = people.Select(p => $"{p.Id},{p.Name},{p.Surname},{p.Email}");
            
            File.WriteAllLines(filepath, strings); // AppendAllLines per non sostituire
        }
    }
}
